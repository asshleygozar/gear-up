import { getAllBudgets } from "#controllers/budget.controller.js";
import Router from "express";

const router = Router();

router.get("/", getAllBudgets);

export default router;
