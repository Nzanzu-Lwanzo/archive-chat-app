import Message from "../database/models/messages.mjs";
import { Op } from "sequelize";

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const getMessages = async (request, response) => {
  let sid = request.user.id;
  let rid = request.parsedId;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sid, rid },
          { sid: rid, rid: sid },
        ],
      },
    });

    response.json(messages);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @returns 
 */
export const deleteMessage = async (request, response) => {
  
  try {

    let id = request.parsedId;
    let count = await Message.destroy({where : { id, sid : request.user.id }});

    if(count === 0) return response.sendStatus(404);

    response.sendStatus(204);

  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};
