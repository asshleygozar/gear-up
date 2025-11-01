import { Router } from "express";
import { signIn } from "../controller/auth-controller.ts";
import { validateBody } from "../middlewares/validation.ts";
import { SignInSchema } from "../lib/auth.ts";
import z from "zod";

const router = Router();

router.post("/signIn", validateBody(SignInSchema), signIn);

export default router;
