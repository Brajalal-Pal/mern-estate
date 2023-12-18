import express from "express";
import { getGenres } from "../controller/common.controller";

const router = express.Router();

/**
 * Get all genres - GET /api/v1/movie/genres
 */

router.get("/movie/genres", getGenres);

export default router;
