// Transactions Route
import { Router } from "express";
import { CreateTransactionSchema } from "#lib/transaction-type.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import { createTransaction } from "#controllers/transaction.controller.js";

const router = Router();
router.post("/create", validateBody(CreateTransactionSchema), createTransaction);

export default router;
