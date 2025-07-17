import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import { env } from "./config";
import router from "./router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_URL || "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(
  session({
    secret: env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to QuestsHub API");
});

app.use("/api", router);

export default app;
