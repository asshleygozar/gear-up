import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import { env } from "env.ts";

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
