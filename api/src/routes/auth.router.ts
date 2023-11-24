import express from "express";
import { postSignup } from "../controller/auth.controller";

const router = express.Router();

/**
 * Login - POST /api/v1/users/signup
 */
router.post("/users/signup", postSignup);

export default router;
