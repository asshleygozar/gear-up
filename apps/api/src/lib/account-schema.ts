import * as z from "zod";

export const CreateAccountSchema = z.object({
    account_name: z.string(),
    account_type: z.string(),
    total_balance: z.coerce.number().default(0),
    total_income: z.coerce.number().default(0),
    total_expense: z.coerce.number().default(0),
});

export type CreateAccountType = z.infer<typeof CreateAccountSchema>;
