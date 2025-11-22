import loadEnv from "dotenv";
import { z, ZodError } from "zod";

process.env.APP_STAGE = process.env.APP_STAGE || "dev";

const isDevelopment = process.env.APP_STAGE === "dev";
const isTest = process.env.APP_STAGE === "test";

if (isDevelopment) {
    loadEnv.config();
} else if (isTest) {
    loadEnv.config({ path: ".env.test" });
}

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    APP_STAGE: z.enum(["dev", "production", "test"]).default("dev"),
    PORT: z.coerce.number().positive().default(8080),
    DATABASE_URL: z.string().startsWith("postgresql://"),
    JWT_SECRET: z.string().min(32, "JWT Secret should be 32 characters and more"),
    JWT_EXPIRES_IN: z.string().default("7d"),
    SALT: z.coerce.number().positive().default(12),
    WEB_ORIGIN: z.string(),
    CORS_ORIGIN: z
        .string()
        .or(z.array(z.string()))
        .transform((value) => {
            if (typeof value === "string") {
                return value.split(",").map((origin) => origin.trim());
            }
            return value;
        }),
});

export type ENVType = z.infer<typeof envSchema>;

let env: ENVType;

try {
    env = envSchema.parse(process.env);
} catch (error) {
    if (error instanceof ZodError) {
        console.error("Invalid environment variables");
        console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));

        error.issues.forEach((err) => {
            const path = err.path.join(".");
            console.error(`${path}: ${err.message}`);
        });

        process.exit(1);
    }

    throw error;
}

export const isProducting = () => env.NODE_ENV === "production";
export const isDeveloping = () => env.NODE_ENV === "development";
export const isTesting = () => env.NODE_ENV === "test";

export { env };
