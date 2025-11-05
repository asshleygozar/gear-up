import { createUser, getUserByEmail } from "../model/user.ts";
import { Request, Response } from "express";
import { users } from "@prisma/client";
import { comparePassword, hashPassword } from "#lib/password.ts";
import { generateJWTToken } from "#lib/jwt.ts";
import { SignInValidation, SignUpValidation } from "#lib/auth.ts";

export async function signIn(request: Request<any, any, SignInValidation>, response: Response) {
    try {
        const { email, password } = request.body;

        const user = await getUserByEmail(email);

        if (!user.success || !user.data)
            return response.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: "Invalid credentials",
            });

        const isPasswordValid = await comparePassword(password, user.data.password);

        if (!isPasswordValid)
            return response.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: "Invalid credentials",
            });

        const token = await generateJWTToken({
            id: user.data.user_id,
            email: user.data.email,
            username: user.data.username,
        });

        return response.status(200).json({
            success: true,
            message: "Signed in successfully!",
            data: {
                id: user.data.user_id,
                email: user.data.email,
                username: user.data.username,
                firstName: user.data.first_name,
                lastName: user.data.last_name,
            },
            token,
        });
    } catch (error) {
        console.error("Server error: ", error);
        return response.status(500).json({
            success: false,
            message: "Authentication failed",
            error: "Server error",
        });
    }
}

export async function signUp(request: Request<any, any, SignUpValidation>, response: Response) {
    try {
        const { password } = request.body;

        const hashedPassword = await hashPassword(password);

        const user = await createUser({ data: { ...request.body, password: hashedPassword } });

        if (!user.success || !user.data) {
            return response.status(401).json({ success: false, message: user.message, error: user.error });
        }

        const token = await generateJWTToken({
            id: user.data.user_id,
            email: user.data.email,
            username: user.data.username,
        });

        return response.status(201).json({
            success: true,
            message: "Sign in successfully",
            data: {
                id: user.data.user_id,
                email: user.data.email,
                username: user.data.username,
                firstName: user.data.first_name,
                lastName: user.data.last_name,
                createdAt: user.data.created_at,
            },
            token,
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Failed to create account",
            error: "Server error",
        });
    }
}
