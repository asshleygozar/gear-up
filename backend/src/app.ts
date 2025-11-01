import express from "express";
import cookieParse from "cookie-parser";
import user from "./routes/auth-route";
import cors from "cors";
import helmet from "helmet";
import { env } from "../env";

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
app.use("/api/auth", user);

app.listen(env.PORT, () => {
    console.log(`Server running on PORT localhost://${env.PORT}`);
    console.log(`Environment: ${env.APP_STAGE}`);
});
