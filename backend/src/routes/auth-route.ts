import { Router } from "express";
import { signIn } from "../controller/auth-controller.js";
import { validateBody } from "../middlewares/validation.js";
import { SignInSchema } from "../lib/auth.js";
import z from "zod";

const router = Router();

router.post("/signIn", validateBody(SignInSchema), signIn);

export default router;
