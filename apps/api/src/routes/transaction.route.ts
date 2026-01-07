// Transactions Route
import { Router } from "express";
import { CreateTransactionSchema, UpdateTransactionSchema } from "#lib/transaction-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import { createTransaction, getAllTransactions, updateTransaction } from "#controllers/transaction.controller.js";

const router = Router();
router.get("/", getAllTransactions);
router.post("/create", validateBody(CreateTransactionSchema), createTransaction);
router.put("/update-transaction", validateBody(UpdateTransactionSchema), updateTransaction);

export default router;
