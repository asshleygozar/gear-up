// Transactions Route
import { Router } from "express";
import {
    CreateTransactionSchema,
    UpdateTransactionSchema,
    UpdateTransactionSchema as DeleteTransactionSchema,
} from "#lib/transaction-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import {
    createTransaction,
    deleteTransaction,
    getAllTransactions,
    updateTransaction,
} from "#controllers/transaction.controller.js";

const router = Router();

router.get("/", getAllTransactions);
router.post("/create-transaction", validateBody(CreateTransactionSchema), createTransaction);
router.put("/update-transaction", validateBody(UpdateTransactionSchema), updateTransaction);
router.delete("/delete-transaction", validateBody(DeleteTransactionSchema), deleteTransaction);

export default router;
