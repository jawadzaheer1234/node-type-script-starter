"use strict";

import { Sequelize, DataTypes, Model, ModelCtor } from "sequelize";
const env = "development";
import configFile from "../../db/config/config";
import { DatabaseConfig, DatabaseSchemaNames, DatabaseSchemas } from "~/types";
import fs from "fs";
import path from "path";
const basename = path.basename(__filename);
const config = configFile[env] as DatabaseConfig;

//Requiring and importing models.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const models = {} as DatabaseSchemas;

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    models[model.name as DatabaseSchemaNames] = model;
  });

Object.keys(models).forEach((modelName) => {
  models[modelName as DatabaseSchemaNames].associate(models);
});

export { models, sequelize, Sequelize };
