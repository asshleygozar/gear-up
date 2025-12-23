import { AuthenticatedRequest } from "#middlewares/auth.middleware.js";
import { AccountModel } from "#models/account.model.js";
import type { Response } from "express";
export async function getAllAccounts(request: AuthenticatedRequest, response: Response) {
    try {
        const userId = request.user?.id;

        if (!userId) {
            return response
                .status(401)
                .json({ success: false, message: "User is not authenticated", error: "Unauthenticated" });
        }

        const accounts = await AccountModel.getAllAccounts(userId);

        return response.json({ success: true, message: "Successful", data: accounts });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "Server failed to respond", error: "Server error" });
    }
}
