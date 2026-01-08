import { createAccount, getAllAccounts } from "#controllers/account.controller.js";
import { CreateAccountSchema } from "#lib/account-schema.js";
import { validateBody } from "#middlewares/validation.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllAccounts);
router.post("/create-account", validateBody(CreateAccountSchema), createAccount);

export default router;
