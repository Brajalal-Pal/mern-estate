import { Request, Response } from "express";
import Genre from "../model/genre";

export const getGenres = async (req: Request, res: Response) => {
  const genres = await Genre.find();

  res.json({
    message: "success",
    data: genres,
  });
};
