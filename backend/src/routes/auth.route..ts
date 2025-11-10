import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.ts";
import { validateBody } from "../middlewares/validation.middleware.ts";
import { SignInSchema, SignUpSchema } from "../lib/auth.ts";

const router = Router();

router.post("/signin", validateBody(SignInSchema), signIn);
router.post("/signup", validateBody(SignUpSchema), signUp);

export default router;
