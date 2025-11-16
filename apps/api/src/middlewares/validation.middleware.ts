import type { Request, Response, NextFunction } from "express";
import { type ZodSchema, ZodError } from "zod";

// Validate request body
export const validateBody = (schema: ZodSchema) => {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(request.body);
            request.body = validatedData;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return response.status(400).json({
                    error: "Body validation failed",
                    errors: error.issues.map((e) => ({
                        field: e.path.join("."),
                        message: e.message,
                    })),
                });
            }

            next(error);
        }
    };
};
