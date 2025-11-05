import "dotenv/config.js";
import { users, Prisma } from "@prisma/client";
import { ModelResponse } from "#utils/response.ts";
import { prisma } from "#lib/prisma.ts";
import { SignUpValidation } from "#lib/auth.ts";

export async function createUser({ data }: { data: SignUpValidation }): Promise<ModelResponse<users>> {
    try {
        const user = await prisma.users.create({
            data,
        });

        if (!user) {
            return {
                success: false,
                message: "Failed to create user",
                error: "Database error",
            };
        }
        return {
            success: true,
            message: "User created successfully!",
            data: user,
        };
    } catch (error) {
        console.error("Database error: ", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return {
                    success: false,
                    message: "User with this email already exists",
                    error: error.meta,
                };
            }

            return {
                success: false,
                message: "Failed to create user",
            };
        }
        return {
            success: false,
            message: "Failed to create user",
            error: "Database error",
        };
    }
}

// Query user info by email
export async function getUserByEmail(email: string): Promise<ModelResponse<users>> {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (!user)
            return {
                success: false,
                message: "User not found",
                data: undefined,
                error: "No user found",
            };

        return {
            success: true,
            message: "User found",
            data: user,
        };
    } catch (error) {
        console.error("An error occured: ", error);
        return {
            success: false,
            message: "Failed to query",
            data: undefined,
            error: "Database error",
        };
    }
}
