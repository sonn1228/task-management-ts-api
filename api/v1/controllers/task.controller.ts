import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination.helper";
import searchHelper from "../../../helpers/search.helper";

// [GET] /api/v1/tasks

export const index = async (req: Request, res: Response) => {
  interface Find {
    deleted: boolean;
    status?: string;
    title?: RegExp;
  }
  const find: Find = {
    deleted: false,
  };

  // status
  if (req.query.status) {
    find.status = req.query.status.toString();
  }
  // end status

  // sort
  const sort: any = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[`${req.query.sortKey}`] = req.query.sortValue.toString();
  }
  // end sort

  // pagination
  const countTasks = await Task.countDocuments(find);
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
    skip: 0,
  };
  const objPagination = paginationHelper(initPagination, req.query, countTasks);

  // end pagination

  // search
  const objSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objSearch.regex;
  }
  // end search

  try {
    const tasks = await Task.find(find)
      .sort(sort)
      .limit(objPagination.limitItems)
      .skip(objPagination.skip);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tasks." });
  }
};
// [GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the task." });
  }
};

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const status: string = req.body.status;
  try {
    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
    res.json({
      code: 200,
      message: "Update status successfully.",
    });
  } catch (error) {
    res.json(error);
  }
};

// [PATCH] /api/v1/tasks/changeMulti
export const changeMulti = async (req: Request, res: Response) => {
  const ids: string[] = req.body.ids;
  const key: string = req.body.key;
  const value: string = req.body.value;

  enum Key {
    STATUS = "status",
  }
  try {
    switch (key) {
      case Key.STATUS:
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );
        break;

      default:
        break;
    }

    res.json({
      code: 200,
      message: "Update status successfully.",
    });
  } catch (error) {
    res.json(error);
  }
};
// [POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    const data = await task.save();

    res.json({
      code: 200,
      message: "Create successfully.",
      data: data,
    });
  } catch (error) {
    res.json(error);
  }
};
// [PATCH] /api/v1/tasks/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    await Task.updateOne(
      {
        _id: id,
      },
      req.body
    );
    res.json({
      code: 200,
      message: "Update successfully.",
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
