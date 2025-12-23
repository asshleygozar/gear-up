import GeneralError from "#errors/general-error.js";
import { PrismaError } from "#errors/prisma-error.js";
import { Prisma } from "#generated/prisma/client.js";
import { CreateTransactionType } from "#lib/transaction-schema.js";
import { AuthenticatedRequest } from "#middlewares/auth.middleware.js";
import { createTransactionAndUpdateAccount } from "#services/transaction.service.js";
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

        return response.status(401).json({ success: true, message: "Transaction created successfully" });
    } catch (error) {
        console.error("Server error: ", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to create new transaction", 500);
    }
}
