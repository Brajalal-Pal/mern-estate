import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "error",
      data: "Unauthorized",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "", (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          message: "error",
          data: "Unauthorized",
        });
      }
    });

    next();
  } catch (error) {
    return res.status(401).json({
      message: "error",
      data: "Unauthorized",
    });
  }
};

export default requireAuth;
