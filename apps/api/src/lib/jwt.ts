import { createSecretKey } from "crypto";
import { jwtVerify, SignJWT } from "jose";
import { env } from "#config/env.js";

export type JWTPayload = {
    id: number;
    email: string;
    username: string;
};
const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");

export const generateJWTToken = async (payload: JWTPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN)
        .sign(secretKey);
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
    const { payload } = await jwtVerify(token, secretKey);

    return payload as JWTPayload;
};
