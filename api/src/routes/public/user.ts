import express from "express";
import { getUsers, getUserById } from "../../controller/user";

const router = express.Router();

/**
 * Get all users - GET /api/v1/users
 */
router.get(`/users`, getUsers);

/**
 * Get a user by id - GET /api/v1/users/:id
 */
router.get(`/users/:id`, getUserById);

export default router;
