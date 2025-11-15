import { Router } from "express";
import { signIn, signUp } from "#controllers/auth.controller.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import { SignInSchema, SignUpSchema } from "#lib/auth.js";

const router = Router();

router.post("/signin", validateBody(SignInSchema), signIn);
router.post("/signup", validateBody(SignUpSchema), signUp);

export default router;
