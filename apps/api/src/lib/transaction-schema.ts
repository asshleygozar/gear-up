import * as z from "zod";

export const CreateTransactionSchema = z.object({
    transactionCategory: z.string(),
    transactionAmount: z.coerce.number(),
    transactionDate: z.string().datetime(),
    transactionAccountReceiver: z.number().optional(),
    transactionType: z.enum(["income", "expense", "transfer"]),
    transactionDescription: z.string().optional(),
    accountId: z.coerce.number(),
});

export const UpdateTransactionSchema = z.object({
    transactionId: z.coerce.number(),
    transactionCategory: z.string(),
    transactionAmount: z.coerce.number(),
    transactionDate: z.string().datetime(),
    transactionAccountReceiver: z.number().optional(),
    transactionType: z.enum(["income", "expense", "transfer"]),
    transactionDescription: z.string().optional(),
    accountId: z.coerce.number(),
});

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionType = z.infer<typeof UpdateTransactionSchema>;
