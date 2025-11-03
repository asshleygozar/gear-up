import { hash } from "bcryptjs";

const SALT = 10;
export const hashedPassword = (password: string) => {
    return hash(password, SALT);
};
