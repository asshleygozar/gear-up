import { Router } from "express";
import { signIn } from "../controller/auth-controller.js";

const router = Router();

router.post("/signIn", signIn);

export default router;
