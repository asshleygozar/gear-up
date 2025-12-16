import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JWTPayload } from "#lib/jwt.js";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";
export interface AuthenticatedRequest<P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>
    extends Request<P, ResBody, ReqBody, ReqQuery> {
    user?: JWTPayload;
}

export const authenticateToken = async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    try {
        const token = request.headers.authorization?.split(" ")[1];
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
