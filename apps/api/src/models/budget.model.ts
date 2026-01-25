import { Budgets } from "#generated/prisma/client.js";
import { DeleteBudgetType, UpdateBudgetType } from "#lib/budget-schema.js";
import { prisma } from "#lib/prisma.js";

export const BudgetModel = {
    getAllBudgets: async ({ userId }: { userId: number }): Promise<Budgets[]> => {
        return await prisma.budgets.findMany({
            where: {
                userId: userId,
            },
        });
    },
    deleteBudget: async ({ userId, data }: { userId: number; data: DeleteBudgetType }) => {
        return await prisma.budgets.delete({
            where: {
                budgetId: data.budgetId,
                userId: userId,
            },
        });
    },
    updateBudget: async ({ userId, data }: { userId: number; data: UpdateBudgetType }) => {
        const { budgetId, ...updatedData } = data;
        return await prisma.budgets.update({
            where: {
                userId: userId,
                budgetId: data.budgetId,
            },
            data: updatedData,
        });
    },
};
