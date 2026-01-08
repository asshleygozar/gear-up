import * as z from "zod";

export const CreateAccountSchema = z.object({
    account_name: z.string(),
    account_type: z.string(),
    total_balance: z.coerce.number().default(0),
    total_income: z.coerce.number().default(0),
    total_expense: z.coerce.number().default(0),
});

export const DeleteAccountSchema = z.object({
    account_id: z.coerce.number(),
    account_name: z.string(),
    account_type: z.string(),
    total_balance: z.coerce.number(),
    total_income: z.coerce.number(),
    total_expense: z.coerce.number(),
});

export type CreateAccountType = z.infer<typeof CreateAccountSchema>;
export type DeleteAccountType = z.infer<typeof DeleteAccountSchema>;
