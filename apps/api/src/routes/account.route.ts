import { createAccount, deleteAccount, getAllAccounts } from "#controllers/account.controller.js";
import { CreateAccountSchema, DeleteAccountSchema } from "#lib/account-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllAccounts);
router.post("/create-account", validateBody(CreateAccountSchema), createAccount);
router.delete("/delete-account", validateBody(DeleteAccountSchema), deleteAccount);

export default router;
