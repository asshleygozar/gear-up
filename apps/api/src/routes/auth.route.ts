import { Router } from "express";
import { signIn, signUp, validate } from "#controllers/auth.controller.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import { SignInSchema, SignUpSchema } from "#lib/auth.js";
import { authenticateToken } from "#middlewares/auth.middleware.js";

const router = Router();

router.post("/signin", validateBody(SignInSchema), signIn);
router.post("/signup", validateBody(SignUpSchema), signUp);
router.post("/validate", authenticateToken, validate);
export default router;
