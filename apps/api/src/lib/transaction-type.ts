import * as z from "zod";

export const CreateTransactionSchema = z.object({
    transaction_category: z.string(),
    transaction_amount: z.number(),
    transaction_date: z.iso.datetime(),
    transaction_description: z.string().optional(),
    account_id: z.number(),
});

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>;
