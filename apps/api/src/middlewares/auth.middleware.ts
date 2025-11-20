import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JWTPayload } from "#lib/jwt.js";

interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}

export const authenticateToken = async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    try {
        const token = request.cookies.token;

        if (!token) {
            return response.status(401).json({ success: false, message: "Not authenticated", error: "Bad request" });
        }

        const payload = await verifyToken(token);

        request.user = payload;
        next();
    } catch (error) {
        return response.status(403).json({ success: false, message: "Unauthorized access", error: "Forbidden" });
    }
};
