import { Router } from "express";
import { addUser } from "~/controllers";
export const userRouter = Router();

userRouter.post("/", addUser);
