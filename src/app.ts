import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { IndexRoute } from "./app/router/index.route";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundRoute } from "./middleware/notFoundRoute";

const app: Application = express();
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", IndexRoute);
// Basic route
app.get("/", async (req: Request, res: Response) => {
  const specialty = await prisma.specialty.create({
    data: {
      title: "Cardiology",
      description: "Heart related specialty",
    },
  });
  res.status(201).json({ success: 200, result: specialty });
});

app.use(errorHandler);
app.use(notFoundRoute);
export default app;
