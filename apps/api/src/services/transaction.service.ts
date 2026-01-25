import { prisma } from "#lib/prisma.js";
import { CreateTransactionType, UpdateTransactionType as DeleteTransactionType } from "#lib/transaction-schema.js";
import GeneralError from "#errors/general-error.js";

export const createTransactionAndUpdateAccount = async ({
    data,
    userId,
}: {
    data: CreateTransactionType;
    userId: number;
}) => {
    const result = await prisma.$transaction(async (tx) => {
        const transaction = await tx.transactions.create({
            data: {
                ...data,
                userId: userId,
            },
        });

        switch (transaction.transactionType) {
            case "income": {
                const incomeUpdate = await tx.accounts.update({
                    where: {
                        accountId: transaction.accountId,
                    },
                    data: {
                        totalIncome: {
                            increment: transaction.transactionAmount,
                        },
                        totalBalance: {
                            increment: transaction.transactionAmount,
                        },
                    },
                });
                return incomeUpdate;
            }

            case "expense": {
                const [expenseUpdate, _] = await Promise.all([
                    await tx.accounts.update({
                        where: {
                            accountId: transaction.accountId,
                        },
                        data: {
                            totalExpense: {
                                increment: transaction.transactionAmount,
                            },
                            totalBalance: {
                                decrement: transaction.transactionAmount,
                            },
                        },
                    }),
                    await tx.budgets.updateMany({
                        where: {
                            userId: userId,
                            budgetCategory: transaction.transactionCategory,
                        },
                        data: {
                            budgetCurrentAmount: {
                                increment: transaction.transactionAmount,
                            },
                        },
                    }),
                ]);

                return expenseUpdate;
            }

            case "transfer": {
                if (!transaction.accountIdReceiver) {
                    throw new GeneralError("Incomplete Info error", "Receiver Account is not provided", 400);
                }

                const [_, receiverAccountUpdate] = await Promise.all([
                    await tx.accounts.update({
                        where: {
                            accountId: transaction.accountId,
                        },
                        data: {
                            totalExpense: {
                                increment: transaction.transactionAmount,
                            },
                            totalBalance: {
                                decrement: transaction.transactionAmount,
                            },
                        },
                    }),
                    await tx.accounts.update({
                        where: {
                            accountId: transaction.accountIdReceiver,
                        },
                        data: {
                            totalIncome: {
                                increment: transaction.transactionAmount,
                            },
                            totalBalance: {
                                increment: transaction.transactionAmount,
                            },
                        },
                    }),
                ]);

                return receiverAccountUpdate;
            }
            default: {
                return new GeneralError("Type error", "Unknown or transaction type not provided", 400);
            }
        }
    });

    return result;
};

export const deleteTransactionAndUpdateAccount = async ({
    userId,
    data,
}: {
    userId: number;
    data: DeleteTransactionType;
}) => {
    const result = await prisma.$transaction(async (tx) => {
        const deleteTransaction = await tx.transactions.delete({
            where: {
                transactionId: data.transactionId,
            },
        });

        switch (deleteTransaction.transactionType) {
            case "income": {
                const incomeUpdate = await tx.accounts.update({
                    where: {
                        accountId: deleteTransaction.accountId,
                    },
                    data: {
                        totalIncome: {
                            decrement: deleteTransaction.transactionAmount,
                        },
                        totalBalance: {
                            decrement: deleteTransaction.transactionAmount,
                        },
                    },
                });
                return incomeUpdate;
            }

            case "expense": {
                const [expenseUpdate, _] = await Promise.all([
                    await tx.accounts.update({
                        where: {
                            accountId: deleteTransaction.accountId,
                        },
                        data: {
                            totalExpense: {
                                decrement: deleteTransaction.transactionAmount,
                            },
                            totalBalance: {
                                increment: deleteTransaction.transactionAmount,
                            },
                        },
                    }),
                    await tx.budgets.updateMany({
                        where: {
                            userId: userId,
                            budgetCategory: deleteTransaction.transactionCategory,
                        },
                        data: {
                            budgetCurrentAmount: {
                                decrement: deleteTransaction.transactionAmount,
                            },
                        },
                    }),
                ]);

                return expenseUpdate;
            }
            case "transfer": {
                if (!deleteTransaction.accountIdReceiver) {
                    throw new GeneralError("Incomplete Info error", "Receiver Account is not provided", 400);
                }

                const [_, receiverAccountDelete] = await Promise.all([
                    await tx.accounts.update({
                        where: {
                            accountId: deleteTransaction.accountId,
                        },
                        data: {
                            totalExpense: {
                                decrement: deleteTransaction.transactionAmount,
                            },
                            totalBalance: {
                                increment: deleteTransaction.transactionAmount,
                            },
                        },
                    }),
                    await tx.accounts.update({
                        where: {
                            accountId: deleteTransaction.accountIdReceiver,
                        },
                        data: {
                            totalIncome: {
                                decrement: deleteTransaction.transactionAmount,
                            },
                            totalBalance: {
                                decrement: deleteTransaction.transactionAmount,
                            },
                        },
                    }),
                ]);

                return receiverAccountDelete;
            }
        }
    });

    return result;
};
