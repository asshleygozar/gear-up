import GeneralError from "#errors/general-error.js";
import { PrismaError } from "#errors/prisma-error.js";
import { Prisma } from "#generated/prisma/client.js";
import { CreateTransactionType } from "#lib/transaction-schema.js";
import { AuthenticatedRequest } from "#middlewares/auth.middleware.js";
import { TransactionModel } from "#models/transaction.model.js";
import { createTransactionAndUpdateAccount, deleteTransactionAndUpdateAccount } from "#services/transaction.service.js";
import type { Response } from "express";

export async function createTransaction(
    request: AuthenticatedRequest<any, any, CreateTransactionType>,
    response: Response
) {
    try {
        if (!request.user?.id) {
            throw new GeneralError("Unauthenticated user", "User is not authenticated or not authorized", 401);
        }
        const transaction = await createTransactionAndUpdateAccount({ data: request.body, userId: request.user.id });

        if (!transaction) {
            return response
                .status(400)
                .json({ success: false, message: "Failed to create transaction", error: "Something went wrong" });
        }

        return response
            .status(201)
            .json({ success: true, message: "Transaction created successfully", data: transaction });
    } catch (error) {
        console.error("Server error: ", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to create new transaction", 500);
    }
}

export async function getAllTransactions(request: AuthenticatedRequest, response: Response) {
    try {
        if (!request.user?.id) {
            throw new GeneralError("Unauthenticated user", "User is not authenticated ", 401);
        }

        const transactions = await TransactionModel.findAllTransactions(request.user.id);

        return response.json({ success: true, message: "Transactions fetch successfully!", data: transactions });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to get transactions", 500);
    }
}

export async function updateTransaction(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;

        if (!userId) throw new GeneralError("Unauthenticated user", " User is not authenticated", 401);

        const transaction = await TransactionModel.updateTransaction({ userId: userId, data: request.body });

        return response.json({ success: true, message: "Transaction updated successfully!", data: transaction });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to update transaction", 500);
    }
}

export async function deleteTransaction(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;

        if (!userId) throw new GeneralError("Unauthenticated user", " User is not authenticated", 401);

        const transaction = await deleteTransactionAndUpdateAccount({ userId: userId, data: request.body });

        return response.json({ success: true, message: "Transaction deleted successfully!", data: transaction });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to delete transaction", 500);
    }
}
