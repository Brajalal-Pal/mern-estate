import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../model/user";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/error.handler";

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

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }
    const isPasswordValid = bcrypt.compareSync(password, validUser?.password || "");
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid password!!"));
    }

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET || "", { expiresIn: "1h" });
    const { password: _, ...user } = validUser.toJSON();

    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({ message: "success", user });
  } catch (error) {
    next(error);
  }
};
