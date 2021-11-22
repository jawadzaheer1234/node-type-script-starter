import { Optional, Dialect } from "sequelize";

//Connection String
export interface DatabaseConfig {
  database: string;
  username: string;
  host: string;
  password: string;
  dialect: Dialect;
}
//User model
export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
