import { Sequelize, DataTypes } from "sequelize";
import { Task } from "~/types";
export default (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Task must be assigned to a user.",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Task title cannot be null.",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Task description cannot be null.",
          },
        },
      },
      completionStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      completionDate: {
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        async beforeCreate(task) {
          const { completionDate, completionStatus } = task;
          if (completionDate) task.completionDate = null;
          if (completionStatus) task.completionStatus = false;
        },
      },
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
