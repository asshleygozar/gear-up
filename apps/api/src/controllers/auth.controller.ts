import { UserModel } from "#models/user.model.js";
import type { Request, Response } from "express";
import { comparePassword, hashPassword } from "#lib/password.js";
import { generateJWTToken } from "#lib/jwt.js";
import type { SignInValidation, SignUpValidation } from "#lib/auth.js";
import { PrismaError } from "#errors/prisma-error.js";
import { Prisma } from "@prisma/client";

export async function signIn(request: Request<any, any, SignInValidation>, response: Response) {
    try {
        const { email, password } = request.body;

        const user = await UserModel.findByEmail(email);

        if (!user)
            return response.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: "Invalid credentials",
            });

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid)
            return response.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: "Invalid credentials",
            });

        const token = await generateJWTToken({
            id: user.user_id,
            email: user.email,
            username: user.username,
        });

        return response.status(200).json({
            success: true,
            message: "Signed in successfully!",
            data: {
                id: user.user_id,
                email: user.email,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
            },
            token,
        });
    } catch (error) {
        console.error("Server error: ", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }
        return response.status(500).json({
            success: false,
            message: "Authentication failed",
            error: "Server error",
        });
    }
}

export type UserType = {
    email: string;
    username: string;
    password: string;
};

export async function signUp(request: Request<any, any, SignUpValidation>, response: Response) {
    try {
        const { email, password } = request.body;

        const username = email.split("@")[0];
        const hashedPassword = await hashPassword(password);

        const user = await UserModel.create({
            data: {
                email,
                username,
                password: hashedPassword,
            } as UserType,
        });

        const token = await generateJWTToken({
            id: user.user_id,
            email: user.email,
            username: user.username,
        });

        return response.status(201).json({
            success: true,
            message: "Sign up successfully",
            data: {
                id: user.user_id,
                email: user.email,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                createdAt: user.created_at,
            },
            token,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError(error);
        }
        return response.status(500).json({
            success: false,
            message: "Failed to create account",
            error: "Server error",
        });
    }
}
