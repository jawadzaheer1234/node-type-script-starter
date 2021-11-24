"use strict";

import { Sequelize, DataTypes } from "sequelize";
import { generateHash } from "~/utils";
import { User } from "~/types";

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your first name.",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your last name.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your email.",
          },
          isEmail: {
            msg: "Enter a valid email format.",
          },
        },
        unique: {
          msg: "Email already exists.",
          name: "email",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return undefined;
        },
        validate: {
          min: {
            msg: "Password length must be atleast 6 characters.",
            args: [6],
          },
          notNull: {
            msg: "Please enter your password.",
          },
        },
      },
    },
    {
      hooks: {
        async beforeCreate(user) {
          const { password } = user;
          user.password = await generateHash(password || "");
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
