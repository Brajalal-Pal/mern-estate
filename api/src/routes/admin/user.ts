import express from "express";
import { postUser, patchUser, deleteUserById } from "../../controller/user";

const router = express.Router();

/**
 * Create a user - POST /api/v1/users
 */
router.post(`/users`, postUser);

/**
 * Update a user - PATCH /api/v1/users/:id
 */
router.patch(`/users/:id`, patchUser);

/**
 * Delete a user - DELETE /api/v1/users/:id
 */
router.delete(`/users/:id`, deleteUserById);

export default router;
