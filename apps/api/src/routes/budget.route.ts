import { createBudget, deleteBudget, getAllBudgets, updateBudget } from "#controllers/budget.controller.js";
import { CreateBudgetSchema, DeleteBudgetSchema, UpdateBudgetSchema } from "#lib/budget-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import Router from "express";

const router = Router();

router.get("/", getAllBudgets);
router.post("/create-budget", validateBody(CreateBudgetSchema), createBudget);
router.delete("/delete-budget", validateBody(DeleteBudgetSchema), deleteBudget);
router.put("/update-budget", validateBody(UpdateBudgetSchema), updateBudget);
export default router;
