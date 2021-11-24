import { Response } from "express";
import { Request, TaskAttributes } from "~/types";
import { models } from "~/models";

export const addTask = async (
  request: Request<Exclude<TaskAttributes, "id">>,
  response: Response
) => {
  try {
    const { body } = request;
    const newTask = await models.Task.create(body);
    return response.status(200).json({ newTask });
  } catch (error) {
    return response.status(500).json(error);
  }
};
