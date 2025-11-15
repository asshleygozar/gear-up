import express from "express";
import cookieParse from "cookie-parser";
import user from "#routes/auth.route.js";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import type { Request, Response } from "express";
import { errorHandler } from "#middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.get("/health", (request: Request, response: Response) => {
    response.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "GearUp API",
    });
});

app.use("/auth", user);

app.use(errorHandler);

export default app;
