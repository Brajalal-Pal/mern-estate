import { Request, Response } from "express";
import jsonData from "../data/genres.json";
import Genre from "../model/genre";

export const seedGenre = async (req: Request, res: Response) => {
  const promises = jsonData.genres.map((movie: any) => {
    const newGenre = new Genre(movie);
    return newGenre.save();
  });
  await Promise.all(promises);

  return res.json({
    message: "success",
    data: jsonData,
  });
};
