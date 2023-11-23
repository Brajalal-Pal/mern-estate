import express from "express";
import { postLogin } from "../../controller/user";

const router = express.Router();

/**
 * Login - POST /api/v1/users/login
 */
router.post(`/users/login`, postLogin);

export default router;
