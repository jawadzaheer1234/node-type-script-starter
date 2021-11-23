import { Response } from "express";
import { Request, UserAttributes } from "~/types";
import { models } from "~/models";

/**
 * @swagger
 *
 * /users/:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register A New Account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *
 *               password:
 *                 type: string
 *                 format: password
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Error from user end
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
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
