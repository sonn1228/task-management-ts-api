import { Request, Response } from "express";
import User from "../models/user.model";
import * as generateHelper from "../../../helpers/generate.helper";
import md5 from "md5";
// [POST]/api/v1/users/register
export const register = async (req: Request, res: Response) => {
  console.log(req.body);
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
