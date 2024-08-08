import { config } from "../config";
import express from "express";
import type { Express, Request, Response } from "express";
import { injectModules } from "./injector";
import { error_middlewre } from "../../interface/middleware/error_mw";

export const run = (app: Express) => {
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("🚀 API is Running!");
  });

  injectModules(app);
  app.use(error_middlewre);

  app.get("*", (req: Request, res: Response) => {
    return res.json({ message: "Route not found" });
  });

  app.listen(config.app.port, () => {
    console.log(`🚀 Server running on port ${config.app.port}`);
  });
};
