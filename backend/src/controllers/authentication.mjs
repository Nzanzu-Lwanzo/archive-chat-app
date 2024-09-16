import User from "../database/models/users.mjs";
import { genToken } from "../utils/handleAuthTokens.mjs";

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const signUp = async (request, response) => {
  const data = request.getCleanData();

  try {
    const user = await User.create(data);

    response
      .cookie("ut", genToken({ ...user.dataValues, password: undefined }))
      .status(201)
      .send(user.dataValues);
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
export const logIn = (request, response) => {
  response.cookie("ut", genToken(request.user)).status(200).send(request.user);
};

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const logOut = (request, response) => {
  request.logOut({ keepSessionInfo: true }, (error) => {
    console.log(error);
  });

  response.clearCookie("ut", {}).sendStatus(200);
};

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const signOut = async (request, response) => {
  try {
    await User.destroy({ where: { id: request.user.id } });

    response.clearCookie("ut", {}).sendStatus(204);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};
