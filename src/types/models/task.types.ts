import { Model, Optional } from "sequelize";
import { DatabaseSchemas } from "~/types";

//User model
export interface TaskAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  completionStatus: boolean;
  completionDate?: Date | null;
  image?: string;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}
export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public userId!: number;
  public description!: string;
  public completionStatus!: boolean;
  public completionDate!: Date | undefined | null;
  public image!: string | undefined;
  public title!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  public static associate(models: DatabaseSchemas) {
    const { Task, User } = models;
    Task.hasOne(User, { sourceKey: "userId" });
  }
}
