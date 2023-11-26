import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import protect from "./middleware/authMiddleware";
import authRouter from "./routes/auth.router";

// public routers
import userRouter from "./routes/public/user";

const app = express();
const port = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

// public routes
app.use(API_PREFIX, authRouter); // login, signup

// protected routes
app.use(API_PREFIX, userRouter);

// error middleware handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = (err.statusCode as number) || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.on("uncaughtException", (err: any) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});

app.on("unhandledRejection", (err: any) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("MongoDB connection success");
  })
  .catch((err) => {
    console.error("MongoDB connection error: " + err);
    process.exit(-1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}${API_PREFIX}`);
});
