import GeneralError from "#errors/general-error.js";
import { PrismaError } from "#errors/prisma-error.js";
import { Prisma } from "#generated/prisma/client.js";
import { AuthenticatedRequest } from "#middlewares/auth.middleware.js";
import { BudgetModel } from "#models/budget.model.js";
import type { Response } from "express";

export async function getAllBudgets(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;

        if (!userId)
            return response
                .status(500)
                .json({ success: false, message: "User is not authenticated", error: "Unauthenticated" });

        const budgets = await BudgetModel.getAllBudgets({ userId: userId });

        return response.json({ success: true, message: "Budgets fetch successfully!", data: budgets });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to fetch budgets", 500);
    }
}
