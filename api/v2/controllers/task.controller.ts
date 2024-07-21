import { Request, Response } from "express";
import Task from "../models/task.model";

export const index = async (req: Request, res: Response) => {
  const task = await Task.find({});
  res.json(task);
};

export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.find({
    _id: id,
    deleted: false,
  });
  res.json(task);
};
