import * as z from "zod";

export const CreateAccountSchema = z.object({
    accountName: z.string(),
    accountType: z.string(),
    totalBalance: z.coerce.number().default(0),
    totalIncome: z.coerce.number().default(0),
    totalExpense: z.coerce.number().default(0),
});

export const DeleteAccountSchema = z.object({
    accountId: z.coerce.number(),
    accountName: z.string(),
    accountType: z.string(),
    totalBalance: z.coerce.number(),
    totalIncome: z.coerce.number(),
    totalExpense: z.coerce.number(),
});

export type CreateAccountType = z.infer<typeof CreateAccountSchema>;
export type DeleteAccountType = z.infer<typeof DeleteAccountSchema>;
