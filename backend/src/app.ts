import express from "express";
import cookieParse from "cookie-parser";
import user from "./routes/auth-route.ts";
import cors from "cors";
import helmet from "helmet";
import { env } from "../env.ts";
import type { Request, Response } from "express";

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

export default app;
