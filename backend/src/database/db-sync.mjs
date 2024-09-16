import User from "./models/users.mjs";
import Chats_With from "./models/conversations.mjs";
import Room from "./models/rooms.mjs";
import Message from "./models/messages.mjs";
import sequelize from "./config/sqlite.mjs";

export const userChatsWithManyUsers = User.belongsToMany(User, {
  through: Chats_With,
  as: "chatter",
});

// export const oneUserManyChatters = User.hasMany(Chats_With);
// export const oneChatterManyUsers = Chats_With.belongsTo(User);

export let oneChatterManyUsers;
export let oneUserManyChatters;

export const oneUserCreatesManyRooms = User.hasMany(Room, {
  as: "createdGroup"
});
export const manyRoomsBelongToOneUser = Room.belongsTo(User, {
  foreignKey: {
    // allowNull: false,
    name: "creator_id",
  },
  as: "creator",
});

export const oneUserInManyRooms = User.belongsToMany(Room, {
  through: "User_Room",
});

export const oneRoomHasManyUsers = Room.belongsToMany(User, {
  through: "User_Room",
});

export const oneRoomHasManyMessages = Room.hasMany(Message, {
  foreignKey: {
    name: "room_id",
    field: "room_id",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export const manyMessagesInOneRoom = Message.belongsTo(Room);

export const userSendsManyMessages = User.hasMany(Message, {
  foreignKey: {
    name: "sid",
    field: "sid",
  },
  // onDelete: "NO ACTION",
  as: "sentMessage",
});

export const messageSentByOneUser = Message.belongsTo(User,{
  as : "sender",
  foreignKey : {
    name : "sid",
    field : "rid  "
  }
})

export const userReceivesManyMessages = User.hasMany(Message, {
  foreignKey: {
    name: "rid",
    field: "rid",
  },
  // onDelete: "NO ACTION",
  as: "receivedMessage",
});

sequelize.sync()
    .then(_ => { console.log(`Migration to ${sequelize.getDatabaseName()} db successful !`) })
    .catch(e => console.log(`Migration to ${sequelize.getDatabaseName()} db failed !`,e))
