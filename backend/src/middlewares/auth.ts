import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JWTPayload } from "#lib/jwt.ts";

interface AuthenticatedRequest extends Request {
    data: JWTPayload;
}

export const authenticateToken = async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return response.status(401).json({ success: false, message: "No auth header found", error: "Bad request" });
        }

        const payload = await verifyToken(token);

        request.data = payload;
        next();
    } catch (error) {
        return response.status(403).json({ success: false, message: "Unauthorized access", error: "Forbidden" });
    }
};
