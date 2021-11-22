import { Optional } from "sequelize";

//User model
export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
