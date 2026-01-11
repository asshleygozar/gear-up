import { createBudget, deleteBudget, getAllBudgets } from "#controllers/budget.controller.js";
import { CreateBudgetSchema, DeleteBudgetSchema } from "#lib/budget-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import Router from "express";

const router = Router();

router.get("/", getAllBudgets);
router.post("/create-budget", validateBody(CreateBudgetSchema), createBudget);
router.delete("/delete-budget", validateBody(DeleteBudgetSchema), deleteBudget);
export default router;
