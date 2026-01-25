import { Budgets } from "#generated/prisma/client.js";
import { CreateBudgetType } from "#lib/budget-schema.js";
import { prisma } from "#lib/prisma.js";

export const createBudgetService = async ({
    userId,
    data,
}: {
    userId: number;
    data: CreateBudgetType;
}): Promise<Budgets> => {
    const result = await prisma.$transaction(async (tx) => {
        const transaction = await tx.transactions.aggregate({
            where: {
                userId: userId,
                transactionType: "expense",
                transactionCategory: data.budgetCategory,
                transactionDate: {
                    lte: data.budgetEnd,
                    gte: data.budgetStart,
                },
            },
            _sum: {
                transactionAmount: true,
            },
        });

        const budget = await tx.budgets.create({
            data: {
                ...data,
                userId: userId,
                budgetCurrentAmount: transaction._sum.transactionAmount ?? 0.0,
            },
        });

        return budget;
    });

    return result;
};
