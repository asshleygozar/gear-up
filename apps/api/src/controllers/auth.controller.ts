import { UserModel } from "#models/user.model.js";
import type { Request, Response } from "express";
import { comparePassword, hashPassword } from "#lib/password.js";
import { generateJWTToken } from "#lib/jwt.js";
import type { SignInValidation, SignUpValidation } from "#lib/auth.js";
import { PrismaError } from "#errors/prisma-error.js";
import { Prisma } from "@prisma/client";
import { env } from "#config/env.js";

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

        return response
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                domain: env.WEB_ORIGIN,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            })
            .status(200)
            .json({
                success: true,
                message: "Signed in successfully!",
                data: {
                    id: user.user_id,
                    email: user.email,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                },
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
    firstName?: string;
    lastName?: string;
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
        return response
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                domain: env.WEB_ORIGIN,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(201)
            .json({
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

export async function validate(request: Request, response: Response) {
    return response.status(200).json({ success: true, message: "Validated" });
}
