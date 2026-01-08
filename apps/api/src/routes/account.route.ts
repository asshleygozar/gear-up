import { createAccount, deleteAccount, getAllAccounts, updateAccount } from "#controllers/account.controller.js";
import {
    CreateAccountSchema,
    DeleteAccountSchema,
    DeleteAccountSchema as UpdateAccountSchema,
} from "#lib/account-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllAccounts);
router.post("/create-account", validateBody(CreateAccountSchema), createAccount);
router.delete("/delete-account", validateBody(DeleteAccountSchema), deleteAccount);
router.put("/update-account", validateBody(UpdateAccountSchema), updateAccount);

export default router;
