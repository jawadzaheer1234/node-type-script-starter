import { Request as CustomRequest } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { UserAttributes } from "~/types";

type RequestBodyControllers = Omit<UserAttributes, "id"> | {};
export type Request<T extends RequestBodyControllers = {}> = CustomRequest<
  ParamsDictionary,
  unknown,
  T,
  qs.ParsedQs
>;
