import { getAllAccounts } from "#controllers/account.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllAccounts);

export default router;
