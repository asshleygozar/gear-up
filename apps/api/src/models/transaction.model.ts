import { prisma } from "#lib/prisma.js";
import { UpdateTransactionType } from "#lib/transaction-schema.js";

export const TransactionModel = {
    findAllTransactions: async (userId: number) => {
        return await prisma.transactions.findMany({
            where: {
                user_id: userId,
            },
        });
    },
    updateTransaction: async ({ userId, data }: { userId: number; data: UpdateTransactionType }) => {
        return await prisma.transactions.update({
            where: {
                transaction_id: data.transaction_id,
                user_id: userId,
            },
            data: data,
        });
    },
};
