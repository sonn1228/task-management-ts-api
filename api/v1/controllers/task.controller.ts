import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination.helper";
import searchHelper from "../../../helpers/search.helper";
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
