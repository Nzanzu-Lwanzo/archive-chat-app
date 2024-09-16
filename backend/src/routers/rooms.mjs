import { Router } from "express";
import {
  getCleanData,
  getUserFromSession,
  isAuthenticated,
  parseDataId,
} from "../utils/middlewares.mjs";
import {
  addUserToRoom,
  createRoom,
  deleteRoom,
  getRoomMessages,
  getRoomUsers,
  getUserRooms,
  removeUserFromRoom,
  updateRoom,
} from "../controllers/rooms.mjs";
import { body } from "express-validator";
import { getFileStorage, getFileUploader } from "../utils/fileUploader.mjs";

const roomRouter = Router();
const parseUrl = (request, response, next) => {
  const { room_id, user_id } = request.params;

  let p_room_id = parseInt(room_id);
  let p_user_id = parseInt(user_id);

  if (isNaN(p_room_id) || isNaN(p_user_id))
    throw new Error("Invalid parameters value.");

  request.ids = { p_room_id, p_user_id };

  next();
};
const validateRoomData = [
  body("name")
    .optional()
    .isLength({ max: 32 })
    .withMessage("[name] must be at most 32 characters long."),
  body("description")
    .optional()
    .isLength({ max: 165 })
    .withMessage("[description] must be at most 165 characters long."),
  body("restricted")
    .isBoolean()
    .withMessage("[restricted] value must be a boolean.")
    .default(false),
];

const fileStorage = getFileStorage("/groups-profile-images/");
const uploadFile = getFileUploader(fileStorage,"image");

roomRouter.post(
  "/",
  isAuthenticated,
  getUserFromSession,
  uploadFile,
  validateRoomData,
  getCleanData,
  createRoom
);

roomRouter.patch(
  "/:id/",
  isAuthenticated,
  getUserFromSession,
  uploadFile,
  validateRoomData,
  getCleanData,
  parseDataId,
  updateRoom
);

roomRouter.get("/", isAuthenticated, getUserFromSession, getUserRooms);

roomRouter.get("/messages/:id/", isAuthenticated, parseDataId, getRoomMessages);

roomRouter.get("/:id/", isAuthenticated, parseDataId, getRoomUsers);

roomRouter.delete(
  "/:id/",
  isAuthenticated,
  getUserFromSession,
  parseDataId,
  deleteRoom
);

roomRouter.post(
  "/:room_id/:user_id/",
  isAuthenticated,
  parseUrl,
  addUserToRoom
);

roomRouter.delete(
  "/:room_id/:user_id/",
  isAuthenticated,
  getUserFromSession,
  // Check if he is the creator
  parseUrl,
  removeUserFromRoom
);

export default roomRouter;
