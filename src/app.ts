import express, { Application, Request, Response } from "express";
import { IndexRoute } from "./app/router/index.route";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundRoute } from "./middleware/notFoundRoute";
import AppError from "./errorHelpers/AppError";
import status from "http-status";

const app: Application = express();
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", IndexRoute);
// Basic route
app.get("/", async (req: Request, res: Response) => {
  throw new AppError(status.BAD_REQUEST, "Your request is Bad");
  res.status(201).json({ success: 200, result: "working server" });
});

app.use(errorHandler);
app.use(notFoundRoute);
export default app;
