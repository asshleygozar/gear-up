import * as z from "zod";

export const CreateBudgetSchema = z.object({
    budget_max_amount: z.coerce.number(),
    budget_start: z.iso.datetime(),
    budget_end: z.iso.datetime(),
    budget_period: z.enum(["monthly", "weekly", "daily", "one-time"]),
    budget_category: z.string(),
    budget_description: z.string(),
});

export const DeleteBudgetSchema = z.object({
    budget_id: z.coerce.number(),
});

export type CreateBudgetType = z.infer<typeof CreateBudgetSchema>;
export type DeleteBudgetType = z.infer<typeof DeleteBudgetSchema>;
