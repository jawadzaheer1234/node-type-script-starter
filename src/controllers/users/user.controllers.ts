import { Response } from "express";
import { Request, UserAttributes } from "~/types";
import { models } from "~/models";

export const addUser = async (
  request: Request<Exclude<UserAttributes, "id">>,
  response: Response
) => {
  try {
    const { body } = request;
    const newUser = await models.User.create(body);
    return response.status(200).json({ newUser });
  } catch (error) {
    return response.status(500).json(error);
  }
};
