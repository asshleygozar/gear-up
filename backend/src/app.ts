import express from "express";
import cookieParse from "cookie-parser";
import user from "./routes/auth-route";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use("/api/auth", user);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
