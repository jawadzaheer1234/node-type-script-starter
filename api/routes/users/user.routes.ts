import { Router } from "express";
import { addUser, getUser } from "~/controllers";
export const userRouter = Router();

userRouter.post("/", addUser);
userRouter.get("/:id", getUser);
