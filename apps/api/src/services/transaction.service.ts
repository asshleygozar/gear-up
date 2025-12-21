import "dotenv/config.js";
import { prisma } from "#lib/prisma.js";
import { CreateTransactionType } from "#lib/transaction-type.js";
import GeneralError from "#errors/general-error.js";

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
                                increment: transaction.transaction_amount,
                            },
                            total_balance: {
                                decrement: transaction.transaction_amount,
                            },
                        },
                    });
                    return expenseUpdate;
                case "transfer":
                    if (!transaction.account_id_receiver) {
                        throw new GeneralError("Incomplete Info error", "Receiver Account is not provided", 400);
                    }

                    const [_, receiverAccountUpdate] = await Promise.all([
                        await tx.accounts.update({
                            where: {
                                account_id: transaction.account_id,
                            },
                            data: {
                                total_expense: {
                                    increment: transaction.transaction_amount,
                                },
                                total_balance: {
                                    decrement: transaction.transaction_amount,
                                },
                            },
                        }),
                        await tx.accounts.update({
                            where: {
                                account_id: transaction.account_id_receiver,
                            },
                            data: {
                                total_income: {
                                    increment: transaction.transaction_amount,
                                },
                                total_balance: {
                                    increment: transaction.transaction_amount,
                                },
                            },
                        }),
                    ]);

                    return receiverAccountUpdate;
            }
        });

        return result;
    } catch (error) {
        console.error("Transaction failed, all operations rolled back: ", error);
    }
};
