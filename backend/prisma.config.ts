import { defineConfig } from "prisma/config";
import "dotenv/config";
import { config } from "dotenv";
import { env } from "./env";

config();

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    engine: "classic",
    datasource: {
        url: env.DATABASE_URL,
    },
});
