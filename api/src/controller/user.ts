import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({ status: { $in: ["active", "inactive"] } }).select("-passwordHash");

  res.json({
    message: "success",
    data: users,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const isValidUserId = mongoose.isValidObjectId(req.params.id);
  if (!isValidUserId) {
    return res.status(400).json({
      message: "error",
      data: "Invalid User Id",
    });
  }

  const user = await User.findById(req.params.id).select("-passwordHash");

  if (user) {
    res.json({
      message: "success",
      data: user,
    });
  } else {
    res.status(404).json({
      message: "error",
      data: "User not found",
    });
  }
};

export const postUser = (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user = new User({
    username,
    email,
    password: passwordHash,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error",
        data: err,
      });
    });
};

// export const patchUser = async (req: Request, res: Response) => {
//   const user = await User.findById(req.params.id);
//   if (user) {
//     const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;

//     name ? (user.name = name) : null;
//     email ? (user.email = email) : null;
//     if (password) {
//       const salt = bcrypt.genSaltSync(10);
//       const passwordHash = bcrypt.hashSync(password, salt);
//       user.passwordHash = passwordHash;
//     }

//     phone ? (user.phone = phone) : null;
//     isAdmin ? (user.isAdmin = isAdmin) : null;
//     street ? (user.street = street) : null;
//     apartment ? (user.apartment = apartment) : null;
//     zip ? (user.zip = zip) : null;
//     city ? (user.city = city) : null;
//     country ? (user.country = country) : null;

//     const updatedUser = await user.save();
//     res.json({
//       message: "success",
//       data: updatedUser,
//     });
//   } else {
//     res.status(404).json({
//       message: "error",
//       data: "User not found",
//     });
//   }
// };

// export const deleteUserById = async (req: Request, res: Response) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.status = "deleted";
//     const deletedUser = await user.save();

//     res.json({
//       message: "success",
//       data: deletedUser,
//     });
//   } else {
//     res.status(404).json({
//       message: "error",
//       data: "User not found",
//     });
//   }
// };

// export const postLogin = async (req: Request, res: Response) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(400).json({
//       message: "error",
//       data: "User not found",
//     });
//   }

//   const isValidPassword = bcrypt.compareSync(req.body.password, user.passwordHash);
//   if (!isValidPassword) {
//     return res.status(400).json({
//       message: "error",
//       data: "Invalid email or password",
//     });
//   }

//   // exclude passwordHash from the response
//   // const userWithoutPassword = user.toJSON();
//   // const { passwordHash, ...userWithoutPasswordHash } = userWithoutPassword;

//   const token = jwt.sign({ user: user.email, userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET as string, {
//     expiresIn: "1d",
//   });

//   res.json({
//     message: "success",
//     token,
//   });
// };
