import express from "express";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, version: "1.0.0" }));

app.use("/api", routes);

app.use(errorHandler);

export default app;