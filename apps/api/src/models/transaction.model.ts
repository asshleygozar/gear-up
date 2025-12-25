import { prisma } from "#lib/prisma.js";

export const TransactionModel = {
    findAllTransactions: async (userId: number) => {
        return await prisma.transactions.findMany({
            where: {
                user_id: userId,
            },
        });
    },
};
