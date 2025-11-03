import "dotenv/config.js";
import { users } from "@prisma/client";
import { ModelResponse } from "#utils/response.ts";
import { compare } from "bcryptjs";
import { prisma } from "#lib/prisma.ts";

export async function createManyUser(...data: users[]): Promise<ModelResponse> {
    try {
        const users = await prisma.users.createMany({
            data,
        });

        if (!users) {
            return {
                success: false,
                message: "Failed to create many users",
                error: "Something went wrong while creating users",
            };
        }

        return {
            success: true,
            message: "Users created successfully!",
        };
    } catch (error) {
        console.error("Database error: ", error);
        return {
            success: false,
            message: "Failed to create many user",
            error: "Something went wrong with the database",
        };
    }
}

export async function createUser(data: users): Promise<ModelResponse<users>> {
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
        return {
            success: false,
            message: "Failed to create user",
            error: "Database error",
        };
    }
}

// Query user info
type UserCredentials = Pick<users, "email" | "password" | "user_id">;
export async function getUserInfo(email: string): Promise<ModelResponse<UserCredentials>> {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                user_id: true,
                email: true,
                password: true,
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

export async function verifyPassword({
    password,
    recordedPassword,
}: {
    password: string;
    recordedPassword: string;
}): Promise<ModelResponse> {
    try {
        const isPasswordValid = await compare(password, recordedPassword);

        if (!isPasswordValid)
            return {
                success: false,
                message: "Invalid password",
            };

        return {
            success: true,
            message: "Valid password",
        };
    } catch (error) {
        console.error("An error occured: ", error);
        return {
            success: false,
            message: "Failed to verify password",
            error: "Server error",
        };
    }
}

export async function isUsernameExists(username: string): Promise<ModelResponse> {
    try {
        const user = await prisma.users.findUnique({
            select: {
                username: true,
            },
            where: {
                username: username,
            },
        });

        if (user) {
            return {
                success: false,
                message: "Username already exists",
            };
        }

        return {
            success: true,
            message: "Username available",
        };
    } catch (error) {
        console.error("Database error: ", error);
        return {
            success: false,
            message: "Failed to query username",
            error: "Database error, Failed to query username",
        };
    }
}
