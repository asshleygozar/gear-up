import express from "express";
import cookieParse from "cookie-parser";
import user from "#routes/auth.route.js";
import transaction from "#routes/transaction.route.js";
import account from "#routes/account.route.js";
import budget from "#routes/budget.route.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import type { Request, Response } from "express";
import { errorHandler } from "#middlewares/error.middleware.js";
import { authenticateToken } from "#middlewares/auth.middleware.js";

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: "Too many attempts please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

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

app.use("/api/auth", limiter, user);
app.use("/api/transactions", authenticateToken, transaction);
app.use("/api/accounts", authenticateToken, account);
app.use("/api/budgets", authenticateToken, budget);
app.use(errorHandler);

export default app;
