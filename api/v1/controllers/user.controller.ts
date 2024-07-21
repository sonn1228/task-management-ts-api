import { Request, Response } from "express";
import User from "../models/user.model";
import * as generateHelper from "../../../helpers/generate.helper";
import md5 from "md5";
// [POST]/api/v1/users/register
export const register = async (req: Request, res: Response) => {
  const existUser = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (existUser) {
    res.json({
      code: 400,
      message: "User existed",
    });
    return;
  }

  try {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      token: generateHelper.generateRandomString(30),
    });
    const data = await user.save();
    res.json({
      code: 200,
      message: "Create successfully.",
      data: data,
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
// [POST]/api/v1/users/login
export const login = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const existUser = await User.findOne({
      email: email,
      deleted: false,
    });

    if (!existUser) {
      res.json({
        code: 400,
        message: "Email Not Found!",
      });
      return;
    }

    if (existUser.password != md5(password)) {
      res.json({
        code: 400,
        message: "Password error!",
      });
      return;
    }
    const token = existUser.token;
    res.cookie("token", token);
    res.json({
      code: 200,
      message: "Login successfully.",
      token: token,
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
// [POST]/api/v1/users/detail
export const detail = async (req: any, res: Response) => {
  const id: string = req.params.id;
  try {
    res.json({
      code: 200,
      message: "success",
      data: req.user,
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
