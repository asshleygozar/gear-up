import * as z from "zod";

export const TransactionSchema = z.object({
    transaction_category: z.string(),
    transaction_amount: z.coerce.number(),
    transaction_date: z.string().datetime(),
    transaction_account_receiver: z.number().optional(),
    transaction_type: z.enum(["income", "expense", "transfer"]),
    transaction_description: z.string().optional(),
    account_id: z.coerce.number(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;
