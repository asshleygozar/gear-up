import { createUser, getUserInfo, verifyPassword } from "../model/user.js";
import { SignInSchema } from "../lib/auth.js";
import { Request, Response } from "express";
import { createSession } from "../lib/session.js";
import { isUsernameExists as queryUsername } from "../model/user.js";

export async function signIn(request: Request, response: Response) {
    try {
        const { email, password } = request.body;
        const data = {
            email: email as string,
            password: password as string,
        };

        const user = await getUserInfo(data.email);

        if (!user.success || !user.data)
            return response.json({
                success: false,
                message: "Failed to find user",
                error: "User not found",
            });

        const isPasswordValid = await verifyPassword({
            password: data.password,
            recordedPassword: user.data.password ?? "",
        });

        if (!isPasswordValid.success)
            return response.json({
                success: false,
                message: "Failed to validate password",
                error: "Invalid password",
            });

        await createSession({ userId: user.data.user_id, response: response });

        return response.json({ success: true, message: "Signed in successfully!" });
    } catch (error) {
        console.error("Server error: ", error);
        return response.status(500).json({
            success: false,
            message: "Authentication failed",
            error: "Server error",
        });
    }
}

export async function signUp(request: Request, response: Response) {
    try {
        if (!request.body) {
            return response.status(400).json({
                success: false,
                message: "Failed to receive form data",
                error: "No body provided",
            });
        }

        const { email, password, first_name, last_name, username } = request.body;

        const isUsernameExists = await queryUsername(username);

        if (!isUsernameExists.success) {
            return response.json({
                success: false,
                message: "Username taken please user another username",
                error: "Username taken",
            });
        }

        const user = await createUser({ ...request.body });

        if (!user.success || !user.data) {
            return response.json({ success: false, message: "Failed to create user", error: user.error });
        }

        await createSession({ userId: user.data.user_id, response: response });

        return response.status(200).json({ success: true, message: "Account created successfully!" });
    } catch (error) {
        console.error("Server error: ", error);
        return response.json({
            success: false,
            message: "Failed to create account",
            error: "Server error",
        });
    }
}
