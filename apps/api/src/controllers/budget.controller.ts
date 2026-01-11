import GeneralError from "#errors/general-error.js";
import { PrismaError } from "#errors/prisma-error.js";
import { Prisma } from "#generated/prisma/client.js";
import { AuthenticatedRequest } from "#middlewares/auth.middleware.js";
import { BudgetModel } from "#models/budget.model.js";
import { createBudgetService } from "#services/budget.service.js";
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

export async function createBudget(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;

        if (!userId)
            return response
                .status(401)
                .json({ success: false, message: "User is not authenticated", error: "Unauthenticated" });

        const budget = await createBudgetService({ userId: userId, data: request.body });

        return response.status(201).json({ success: true, message: "Budget created successfully!", data: budget });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }

        throw new GeneralError("Server error", "Failed to create budget", 500);
    }
}
