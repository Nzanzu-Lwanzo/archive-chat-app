import { Router } from "express";
import { getCleanData, getUserFromSession, isAuthenticated, parseDataId } from "../utils/middlewares.mjs";
import { body } from "express-validator";
import { deleteMessage, getMessages } from "../controllers/messages.mjs";

const messageRouter = Router();

messageRouter.post(
    "/:id/",
    isAuthenticated,
    getUserFromSession,
    parseDataId,
    body("content")
        .trim()
        .notEmpty()
        .withMessage("You must send some message."),
    getCleanData,
)

messageRouter.get(
    "/:id/",
    isAuthenticated,
    getUserFromSession,
    parseDataId,
    getMessages
)

messageRouter.delete(
    "/:id/",
    isAuthenticated,
    getUserFromSession,
    parseDataId,
    deleteMessage
)

export default messageRouter;