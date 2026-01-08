import GeneralError from "#errors/general-error.js";
import { PrismaError } from "#errors/prisma-error.js";
import { Prisma } from "#generated/prisma/client.js";
import { AuthenticatedRequest } from "#middlewares/auth.middleware.js";
import { AccountModel } from "#models/account.model.js";
import { deleteAccountAndTransactions } from "#services/account.service.js";
import type { Response } from "express";
export async function getAllAccounts(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;

        if (!userId) {
            return response
                .status(401)
                .json({ success: false, message: "User is not authenticated", error: "Unauthenticated" });
        }

        const accounts = await AccountModel.getAllAccounts(userId);

        return response.json({ success: true, message: "Successful", data: accounts });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "Server failed to respond", error: "Server error" });
    }
}

export async function createAccount(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;
        if (!userId)
            return response.json(401).json({
                success: false,
                message: "User is not authenticated",
                error: "Unauthenticated or Unauthorized",
            });

        const account = await AccountModel.createAccount({ userId: userId, data: request.body });

        return response.json({ success: true, message: "Account created successfully!", data: account });
    } catch (error) {
        console.error("Server error: ", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to create account", 500);
    }
}

export async function deleteAccount(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;

        if (!userId)
            return response
                .status(401)
                .json({ success: false, message: "User is not authenticated", error: "Unauthenticated" });

        const deleteAccount = await deleteAccountAndTransactions({ data: request.body });

        return response
            .status(201)
            .json({ success: true, message: "Account deleted successfully!", data: deleteAccount });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to delete account", 500);
    }
}
