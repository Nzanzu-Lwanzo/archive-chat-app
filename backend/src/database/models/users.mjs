import dotenv from "dotenv";
dotenv.config();
import { DataTypes, Model, Op } from "sequelize";
import sequelize from "../config/sqlite.mjs";
import { hashPassword } from "../../utils/passwordsHandler.mjs";

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING(16),
      unique: true,
      allowNull: false,
      validate: { len: [2, 16] },
    },

    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", hashPassword(value));
      },
    },

    image: {
      type: DataTypes.STRING,
      get() {
        let filename = this.getDataValue("image");
        if (!filename) return undefined;
        return `http://localhost:${process.env.PORT}/users-profile-images/${filename}`;
      },
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
