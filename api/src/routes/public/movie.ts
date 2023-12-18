import express from "express";
import { getMovies, getMoviesByQuery, getAllMovies } from "../../controller/movie";

const router = express.Router();

/**
 * Get all users - GET /api/v1/discover/movies
 */
router.get(`/discover/movies`, getMovies);

/**
 * Get all users - GET /api/v1/search/movies
 */
router.get(`/search/movies`, getAllMovies);

export default router;
