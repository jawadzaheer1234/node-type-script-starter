"use strict";

import { Sequelize, DataTypes, Model } from "sequelize";
import { UserCreationAttributes, UserAttributes } from "~/types";
export default (sequelize: Sequelize) => {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    // Define associations to run for the model in index.ts
    public static associate() {}
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
