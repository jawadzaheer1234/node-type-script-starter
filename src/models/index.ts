"use strict";

import { Dialect, Sequelize } from "sequelize";
const env = "development";
import configFile from "../../db/config/config";
import { DatabaseConfig } from "~/types";
const config = configFile[env] as DatabaseConfig;

//Requiring and importing models.
import user from "./user";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const models = { User: user(sequelize) };
Object.values(models).forEach((model) => {
  if (model.associate) model.associate();
});
export { models, sequelize, Sequelize };
