import { Dialect } from "sequelize";
import { User } from "~/types";

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
