import { Model, Optional } from "sequelize";
import { DatabaseSchemas } from "~/types";
//User model
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  // Define associations to run for the model in index.ts
  public static associate(_: DatabaseSchemas) {}
}
