import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sqlite.mjs";

class Chats_With extends Model{};

Chats_With.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    }
},{
    sequelize,
    modelName : "chatswith"
})

export default Chats_With;