import { prisma } from "#lib/prisma.js";
import { UpdateTransactionType } from "#lib/transaction-schema.js";

export const TransactionModel = {
    findAllTransactions: async (userId: number) => {
        return await prisma.transactions.findMany({
            where: {
                userId: userId,
            },
        });
    },
    updateTransaction: async ({ userId, data }: { userId: number; data: UpdateTransactionType }) => {
        return await prisma.transactions.update({
            where: {
                transactionId: data.transactionId,
                userId: userId,
            },
            data: data,
        });
    },
};
