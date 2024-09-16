import { Router } from "express";
import { getCleanData, getUserFromSession, isAuthenticated } from "../utils/middlewares.mjs";
import { getAll, searchUsers, updateUser } from "../controllers/users.mjs";
import { checkSchema } from "express-validator";
import { user_schema } from "../utils/validationSchemas.mjs";
import { getFileStorage, getFileUploader } from "../utils/fileUploader.mjs";

const userRouter = Router();
const fileStorage = getFileStorage("/users-profile-images/");
const uploadFile = getFileUploader(fileStorage,"image");

userRouter.get(
    "/all/",
    isAuthenticated,
    getUserFromSession,
    getAll
)

userRouter.get(
  "/search/",
  isAuthenticated,
  searchUsers
)

userRouter.patch(
  "/",
  isAuthenticated,
  getUserFromSession,
  uploadFile,
  updateUser
);

export default userRouter;