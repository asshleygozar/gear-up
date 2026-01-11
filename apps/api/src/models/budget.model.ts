import { budgets } from "#generated/prisma/client.js";
import { prisma } from "#lib/prisma.js";

export const BudgetModel = {
    getAllBudgets: async ({ userId }: { userId: number }): Promise<budgets[]> => {
        return await prisma.budgets.findMany({
            where: {
                user_id: userId,
            },
        });
    },
};
