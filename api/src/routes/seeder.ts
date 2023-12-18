import express from "express";
import { seedGenre } from "../controller/seeder";

const router = express.Router();

/**
 * Seed - POST /api/v1/seed/genres
 */
router.get("/seed/genres", seedGenre);

export default router;
