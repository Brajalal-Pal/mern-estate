import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../model/user";

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user = new User({
    username,
    email,
    password: passwordHash,
  });

  try {
    const result = await user.save();
    res.status(201).json({
      message: "success",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
