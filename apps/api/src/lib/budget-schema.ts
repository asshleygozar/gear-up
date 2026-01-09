import * as z from "zod";

export const CreateBudgetSchema = z.object({
    budget_current_amount: z.coerce.number(),
    budget_max_amount: z.coerce.number(),
    budget_start: z.iso.datetime(),
    budget_end: z.iso.datetime(),
    budget_period: z.enum(["monthly", "weekly", "daily", "one-time"]),
    budget_category: z.string(),
});

export type CreateBudgetType = z.infer<typeof CreateBudgetSchema>;
