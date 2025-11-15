import { createSecretKey } from "crypto";
import { jwtVerify, SignJWT } from "jose";
import { env } from "#config/env.js";

export type JWTPayload = {
    id: number;
    email: string;
    username: string;
};

export const generateJWTToken = async (payload: JWTPayload) => {
    const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN)
        .sign(secretKey);
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
    const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");
    const payload = await jwtVerify(token, secretKey);

    return payload as unknown as JWTPayload;
};
