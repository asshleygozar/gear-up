import { budgets } from "#generated/prisma/client.js";
import { CreateBudgetType } from "#lib/budget-schema.js";
import { prisma } from "#lib/prisma.js";

export const createBudgetService = async ({
    userId,
    data,
}: {
    userId: number;
    data: CreateBudgetType;
}): Promise<budgets> => {
    const result = await prisma.$transaction(async (tx) => {
        const transaction = await tx.transactions.aggregate({
            where: {
                user_id: userId,
                transaction_type: "expense",
                transaction_category: data.budget_category,
                transaction_date: {
                    lte: data.budget_end,
                    gte: data.budget_start,
                },
            },
            _sum: {
                transaction_amount: true,
            },
        });

        const budget = await tx.budgets.create({
            data: {
                ...data,
                user_id: userId,
                budget_current_amount: transaction._sum.transaction_amount ?? 0.0,
            },
        });

        return budget;
    });

    return result;
};
