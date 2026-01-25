import * as z from "zod";

export const CreateBudgetSchema = z.object({
    budgetMaxAmount: z.coerce.number(),
    budgetStart: z.iso.datetime(),
    budgetEnd: z.iso.datetime(),
    budgetPeriod: z.enum(["monthly", "weekly", "daily", "one-time"]),
    budgetCategory: z.string(),
    budgetDescription: z.string(),
});

export const DeleteBudgetSchema = z.object({
    budgetId: z.coerce.number(),
});

export const UpdateBudgetSchema = z.object({
    budgetId: z.coerce.number(),
    budgetMaxAmount: z.coerce.number(),
    budgetStart: z.iso.datetime(),
    budgetEnd: z.iso.datetime(),
    budgetPeriod: z.enum(["monthly", "weekly", "daily", "one-time"]),
    budgetCategory: z.string(),
    budgetDescription: z.string().optional(),
});

export type CreateBudgetType = z.infer<typeof CreateBudgetSchema>;
export type DeleteBudgetType = z.infer<typeof DeleteBudgetSchema>;
export type UpdateBudgetType = z.infer<typeof UpdateBudgetSchema>;
