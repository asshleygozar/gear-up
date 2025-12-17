import "dotenv/config.js";
import { prisma } from "#lib/prisma.js";
import { CreateTransactionType } from "#lib/transaction-type.js";

export const createTransactionAndUpdateAccount = async ({
    data,
    userId,
}: {
    data: CreateTransactionType;
    userId: number;
}) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const transaction = await tx.transactions.create({
                data: {
                    ...data,
                    user_id: userId,
                },
            });

            switch (transaction.transaction_type) {
                case "income":
                    const incomeUpdate = await tx.accounts.update({
                        where: {
                            account_id: transaction.account_id,
                        },
                        data: {
                            total_income: {
                                increment: transaction.transaction_amount,
                            },
                            total_balance: {
                                increment: transaction.transaction_amount,
                            },
                        },
                    });
                    return incomeUpdate;

                case "expense":
                    const expenseUpdate = await tx.accounts.update({
                        where: {
                            account_id: transaction.account_id,
                        },
                        data: {
                            total_expense: {
                                decrement: transaction.transaction_amount,
                            },
                            total_balance: {
                                decrement: transaction.transaction_amount,
                            },
                        },
                    });
                    return expenseUpdate;
            }
        });

        return result;
    } catch (error) {
        console.error("Transaction failed, all operations rolled back: ", error);
    }
};
