import { Prisma } from "#generated/prisma/client";

export class PrismaError extends Error {
    statusCode: number;
    code?: string;
    meta?: any;

    constructor(error: Prisma.PrismaClientKnownRequestError, customMessage?: string, statusCode = 400) {
        const message = customMessage ? customMessage : PrismaError.messages(error);
        super(message);
        this.name = "PrismaError";
        this.statusCode = statusCode;
        this.meta = error.meta;
        this.code = error.code;
    }

    private static messages(error: Prisma.PrismaClientKnownRequestError): string {
        switch (error.code) {
            case "P2002":
                return "Duplicate entry: A record with this value already exists.";
            case "P2005":
                return "Record not found: the requested resources does not exists.";
            default:
                return error.message;
        }
    }
}
