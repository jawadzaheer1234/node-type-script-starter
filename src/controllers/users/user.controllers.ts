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

export const getUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const retrievedUser = await models.User.findByPk(Number(id), {
      include: { model: models.Task, separate: true },
    });
    if (!retrievedUser) {
      return response.status(404).jsonp({ message: "User not found " });
    }
    return response.status(200).json({ retrievedUser });
  } catch (error) {
    return response.status(500).json(error);
  }
};
