import { DataTypes, Model } from "sequelize";
import User from "./users.mjs";
import sequelize from "../config/sqlite.mjs";
import Room from "../models/rooms.mjs";

class Message extends Model {}

Message.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,
    modelName: "message",
  }
);

export default Message;
