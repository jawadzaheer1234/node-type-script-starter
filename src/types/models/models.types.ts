import { Dialect } from "sequelize";
import { User } from "~/types";
import { Model as SequelizeModel } from "sequelize";

export class Model<T extends {}, U extends {}> extends SequelizeModel<T, U> {
  public static associate(_: DatabaseSchemas) {}
}
//Connection String
export interface DatabaseConfig {
  database: string;
  username: string;
  host: string;
  password: string;
  dialect: Dialect;
}

// export database schema
export interface DatabaseSchemas {
  User: typeof User;
}

export type DatabaseSchemaNames = keyof DatabaseSchemas;
