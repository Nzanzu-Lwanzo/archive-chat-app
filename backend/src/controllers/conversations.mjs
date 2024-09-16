import { userChatsWithManyUsers } from "../database/db-sync.mjs";
import User from "../database/models/users.mjs";
import Chats_With from "../database/models/conversations.mjs";
import Message from "../database/models/messages.mjs";
import { parse } from "node:url";
import { Op } from "sequelize";

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 *
 */
export const getAllConversations = async (request, response) => {
  try {
    const conversations = await User.findByPk(request.user.id, {
      include: [
        {
          model: User,
          as: "chatter",
        },
        {
          model: Message,
          as: "receivedMessage",
        },
      ],
    });

    response.json(conversations.chatter);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const createConversation = async (request, response) => {
  try {
    let chat_with_id = request.parsedId;

    const user = await User.findByPk(request.user.id);
    const chatsWith = await User.findByPk(chat_with_id);

    // CREATE A CONVERSATION

    try {
      const chat_object = await user.addChatter(chatsWith, {
        include: userChatsWithManyUsers,
      });

      const user_chatting_with = await user.getChatter({
        where: {
          id: chat_with_id,
        },
        include: [userChatsWithManyUsers],
        attributes: {
          exclude: ["password"],
        },
      });

      // Socket emit this conversation to the other user ...
      const chats_with_conversation = await chatsWith.addChatter(user, {
        include: userChatsWithManyUsers,
      });

      const res = chat_object ? user_chatting_with[0].dataValues : {};

      response.status(201).json(res);
    } catch (e) {
      console.log(e.message);
      response.sendStatus(500);
    }
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const deleteConversation = async (request, response) => {
  try {
    let chat_with_id = request.parsedId;
    const { permanent } = request.query;

    const user = await User.findByPk(request.user.id);
    const chats_with = await User.findByPk(chat_with_id);

    if (user) await user.removeChatter(chats_with);
    if (chats_with) await chats_with.removeChatter(user);

    if (permanent === "true") {
      await Message.destroy({
        where: {
          [Op.or]: [
            {
              sid: request.user.id,
              rid: chat_with_id,
            },
            {
              sid: chat_with_id,
              rid: request.user.id,
            },
          ],
        },
      });
    }

    response.sendStatus(204);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};
