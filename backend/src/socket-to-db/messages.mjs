import Message from "../database/models/messages.mjs";
import Room from "../database/models/rooms.mjs";
import User from "../database/models/users.mjs";

export const saveConversationMessage = async ({ content, sid, rid }) => {
  try {
    const message = await Message.create({ content, sid, rid });

    return message.dataValues;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const saveGroupMessage = async ({ content, sid, room_id }) => {
  try {
    const message = await Message.create({ content, sid, room_id });
    const sender = await User.findByPk(sid);

    return { ...message.dataValues, sender: { ...sender.dataValues } };
  } catch (e) {
    console.log(e);
    return {};
  }
};
