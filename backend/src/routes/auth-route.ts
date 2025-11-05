import { Router } from "express";
import { signIn, signUp } from "../controller/auth-controller.ts";
import { validateBody } from "../middlewares/validation.ts";
import { SignInSchema, SignUpSchema } from "../lib/auth.ts";
import z from "zod";

const router = Router();

router.post("/signIn", validateBody(SignInSchema), signIn);
router.post("/signUp", validateBody(SignUpSchema), signUp);

export default router;
