import express from "express";
import { run } from "./infrastructure/server";

const app = express();

run(app);
