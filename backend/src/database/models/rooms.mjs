import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sqlite.mjs";
import { v4 } from "uuid";

class Room extends Model{};

Room.init({

    name : {
        type : DataTypes.STRING(32),
    },

    description : DataTypes.STRING(165),

    image : {
        type: DataTypes.STRING,
        get () {
            let filename = this.getDataValue("image");
            if (!filename) return undefined;
            return `https://moza-chat.onrender.com/groups-profile-images/${filename}`;
        }
    }, 

    restricted : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },

    uuid : {
        type: DataTypes.UUIDV4,
        validate : { isUUID : true},
    }

},{
    sequelize,
    modelName : "room",
    hooks : {
        beforeCreate (room,options) {

            // If no room name provided : Room 102303403930293  (example)
            !
                room.getDataValue("name")
            &&
                room.setDataValue("name",`Group ${Date.now()}`);

            // Store the uuid to identify the room when dealing with socket connection
            room.setDataValue("uuid",v4());

        }
    }
})

export default Room;