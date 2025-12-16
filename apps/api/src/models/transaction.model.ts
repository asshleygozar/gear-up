import "dotenv/config.js";
import { prisma } from "#lib/prisma.js";
import { CreateTransactionType } from "#lib/transaction-type.js";

export const TransactionModel = {
    create: async ({ data, userId }: { data: CreateTransactionType; userId: number }) => {
        return await prisma.transactions.create({
            data: {
                ...data,
                user_id: userId,
            },
        });
    },
};
