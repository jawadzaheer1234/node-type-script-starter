import { Dialect } from "sequelize";
import { User, Task } from "~/types";

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
  Task: typeof Task;
}

export type DatabaseSchemaNames = keyof DatabaseSchemas;
