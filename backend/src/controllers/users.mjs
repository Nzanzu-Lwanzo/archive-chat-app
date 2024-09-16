import User from "../database/models/users.mjs";
import { Op } from "sequelize";

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const getAll = async (request, response) => {
  try {
    // GET THE USERS THAT HAVE GOT NO CONVERSATION WITH THE REQUEST.USER

    const users = await User.findAll({
      where: {
        [Op.not]: {
          id: request.user.id,
        },
      },
      attributes: {
        exclude: ["password"],
      },
    });

    response.send(users || []);
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
export const updateUser = async (request, response) => {
  try {
    const text_data = request.body;
    const profile_image = request.file;
    const updateData = { ...text_data };

    if (profile_image) updateData.image = profile_image.filename;

    const user = await User.findByPk(request.user.id);

    if (!user) return response.sendStatus(404);

    const updatedUser = await user.update(updateData);

    response.json(updatedUser.dataValues);
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
export const searchUsers = async (request, response) => {
  try {
    let { hint } = request.query;

    const users = await User.findAll({
      where: {
        name: {
          [Op.substring]: hint,
        },
      },
    });

    response.json(users || []);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};
