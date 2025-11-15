import { compare, hash } from "bcryptjs";
import { env } from "#config/env.js";

export const hashPassword = async (password: string) => {
    return await hash(password, env.SALT);
};

export const comparePassword = async (password: string, recordedPassword: string): Promise<boolean> => {
    return await compare(password, recordedPassword);
};
