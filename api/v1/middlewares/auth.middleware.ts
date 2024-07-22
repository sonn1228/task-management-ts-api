import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const requireAuth = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.headers.authorization) {
    const token: string = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      token: token,
      deleted: false,
    }).select("-password");

    if (!user) {
      res.status(400).json({
        code: 400,
        message: "Token Invalid!",
      });
      return;
    }
    req["user"] = user;
    // res.locals.user = user; khi render view
    next();
  } else {
    res.status(401).json({
      code: 401,
      message: "Vui lòng gửi kèm token!",
    });
  }
};
