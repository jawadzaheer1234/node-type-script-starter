import { Router } from "express";
import { addTask } from "~/controllers";
export const taskRouter = Router();

taskRouter.post("/", addTask);
