import { Router } from "express";
import { signIn, signUp } from "../controller/auth-controller.ts";
import { validateBody } from "../middlewares/validation.ts";
import { SignInSchema, SignUpSchema } from "../lib/auth.ts";

const router = Router();

router.post("/signin", validateBody(SignInSchema), signIn);
router.post("/signup", validateBody(SignUpSchema), signUp);

export default router;
