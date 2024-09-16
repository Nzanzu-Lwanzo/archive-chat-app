import {
  manyRoomsBelongToOneUser,
  oneRoomHasManyMessages,
  messageSentByOneUser,
  oneUserInManyRooms,
} from "../database/db-sync.mjs";
import Room from "../database/models/rooms.mjs";
import User from "../database/models/users.mjs";

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {Function} cb
 */
const handleRoomParticipants = async (request, response, cb) => {
  try {
    let { p_room_id, p_user_id } = request.ids;

    const user = await User.findByPk(p_user_id);
    if (!user) return response.sendStatus(404);

    const room = await Room.findByPk(p_room_id, {
      include: manyRoomsBelongToOneUser,
    });
    if (!room) return response.sendStatus(404);

    await cb(room, user);

    response.status(201).json(user.dataValues);
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
export const getUserRooms = async (request, response) => {
  try {
    const user = await User.findByPk(request.user.id);

    if (!user) return response.sendStatus(404);

    const rooms = await user.getRooms({
      include: [
        oneUserInManyRooms,
        User,
        {
          model: User,
          as: "creator",
        },
        oneRoomHasManyMessages,
      ],
    });

    response.json(rooms || []);
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
export const createRoom = async (request, response) => {
  try {
    const { name, description, restricted } = request.getCleanData();
    const image = request.file;

    const room = await Room.create({
      name,
      description,
      restricted,
      creator_id: request.user.id,
      image: image?.filename || null,
    });

    const user = await User.findByPk(request.user.id);

    // The creator of the group will be the first participant
    // in a group
    if (user) room.addUser(user);

    response.status(201).json(room.dataValues);
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
export const deleteRoom = async (request, response) => {
  try {
    let id = request.parsedId;
    let count = await Room.destroy({
      where: {
        id: id,
        creator_id: request.user.id,
      },
    });

    if (count === 0) return response.sendStatus(404);

    response.sendStatus(204);
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
export const updateRoom = async (request, response) => {
  try {
    let room_id = request.parsedId;
    const cleanData = request.getCleanData();
    const image = request.file;

    const updateData = { ...cleanData };

    if (image) updateData.image = image.filename;

    const room = await Room.findByPk(room_id);

    if (!room) return response.sendStatus(404);

    const updatedRoom = await room.update(updateData);

    response.status(200).json(updatedRoom.dataValues);
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
export const addUserToRoom = async (request, response) => {
  return handleRoomParticipants(request, response, (room, user) =>
    room.addUser(user)
  );
};

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const removeUserFromRoom = async (request, response) => {
  return handleRoomParticipants(
    request,
    response,

    /**
     *
     * @param {Room} room
     * @param {User} user
     */
    async (room, user) => {
      if (room.creator_id === request?.user?.id) {
        room.set("restricted", false);
        await room.save();
      }

      room.removeUser(user);
    }
  );
};

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
export const getRoomUsers = async (request, response) => {
  try {
    let room_id = request.parsedId;
    const room = await Room.findByPk(room_id);

    if (!room) return response.sendStatus(404);

    const users = await room.getUsers();

    response.json(users || []);
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
export const getRoomMessages = async (request, response) => {
  let room_id = request.parsedId;

  try {
    const room = await Room.findByPk(room_id);

    if (!room) return response.sendStatus(404);

    const messages = await room.getMessages({
      include: {
        model: User,
        as: "sender",
      },
    });

    response.json(messages || []);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
};
