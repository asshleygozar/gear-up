import { PrismaError } from "#errors/prisma-error.ts";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = async (error: Error, request: Request, response: Response, next: NextFunction) => {
    try {
        if (error instanceof PrismaError) {
            response
                .status(error.statusCode)
                .json({ success: false, message: `${error.meta?.target[0]} is not available`, error: error.message });
        }

        response.status(500).json({
            success: false,
            message: error.message,
            error: error.name,
        });
    } catch (error) {
        console.error("An error occured: ", error);
        response.status(500).json({ success: false, message: "Internal server error", error: "Server error" });
    }
};
