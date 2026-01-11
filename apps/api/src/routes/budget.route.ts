import { createBudget, getAllBudgets } from "#controllers/budget.controller.js";
import { CreateBudgetSchema } from "#lib/budget-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import Router from "express";

const router = Router();

router.get("/", getAllBudgets);
router.post("/create-budget", validateBody(CreateBudgetSchema), createBudget);

export default router;
