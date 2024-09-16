import { Router } from "express";
import { getUserFromSession, isAuthenticated, parseDataId } from "../utils/middlewares.mjs";
import { createConversation, deleteConversation, getAllConversations } from "../controllers/conversations.mjs";
import { query } from "express-validator";

const conversationRouter = Router();

conversationRouter.get(
    "/",
    isAuthenticated,
    getUserFromSession,
    getAllConversations
)

conversationRouter.post(
    "/:id/",
    isAuthenticated,
    getUserFromSession,
    parseDataId,
    createConversation
)


conversationRouter.delete(
    "/:id/",
    query("permanent")
        .optional()
        .isBoolean(),
    isAuthenticated,
    getUserFromSession,
    parseDataId,
    deleteConversation
)


export default conversationRouter;