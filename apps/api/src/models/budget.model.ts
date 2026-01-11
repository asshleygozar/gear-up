import { budgets } from "#generated/prisma/client.js";
import { DeleteBudgetType } from "#lib/budget-schema.js";
import { prisma } from "#lib/prisma.js";

export const BudgetModel = {
    getAllBudgets: async ({ userId }: { userId: number }): Promise<budgets[]> => {
        return await prisma.budgets.findMany({
            where: {
                user_id: userId,
            },
        });
    },
    deleteBudget: async ({ userId, data }: { userId: number; data: DeleteBudgetType }) => {
        return await prisma.budgets.delete({
            where: {
                budget_id: data.budget_id,
                user_id: userId,
            },
        });
    },
};
