import express from "express";
import { postSignup, postLogin } from "../controller/auth.controller";

const router = express.Router();

/**
 * SignUp - POST /api/v1/users/sign-up
 */
router.post("/users/signup", postSignup);

/**
 * Login - POST /api/v1/users/login
 */
router.post("/users/signin", postLogin);

export default router;
