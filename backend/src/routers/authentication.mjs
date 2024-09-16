import { Router } from "express";
import {
  signUp,
  signOut,
  logIn,
  logOut,
} from "../controllers/authentication.mjs";
import { checkSchema } from "express-validator";
import { user_schema } from "../utils/validationSchemas.mjs";
import {
  getCleanData,
  getUserFromSession,
  isAuthenticated,
} from "../utils/middlewares.mjs";
import "../authentication-stategies/local.mjs";
import passport from "passport";

const authRouter = Router();

authRouter.post("/sign-up/", checkSchema(user_schema), getCleanData, signUp);

authRouter.post(
  "/log-in/",
  checkSchema(user_schema),
  passport.authenticate("local"),
  logIn
);

authRouter.get("/log-out/", logOut);

authRouter.get("/sign-out/", isAuthenticated, getUserFromSession, signOut);

export default authRouter;
