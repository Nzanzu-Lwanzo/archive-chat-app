// IMPORTS
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./src/database/config/sqlite.mjs";
import authRouter from "./src/routers/authentication.mjs";
import userRouter from "./src/routers/users.mjs";
import roomRouter from "./src/routers/rooms.mjs";
import conversationRouter from "./src/routers/conversations.mjs";
import messageRouter from "./src/routers/messages.mjs";
import { getNowFormatted } from "./src/utils/timeFormats.mjs";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "node:http";
import { CORS_CONFIG } from "./src/utils/constants.mjs";
import {
  saveConversationMessage,
  saveGroupMessage,
} from "./src/socket-to-db/messages.mjs";
import multer from "multer";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// INSTANCES
const App = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(App);
const io = new Server(server, { cors: CORS_CONFIG });
const pathTo = (path)=> {
  return join(dirname(fileURLToPath(import.meta.url)), path);
}

// MIDDLEWARES
App.use(express.json());
App.use(express.query());
App.use(express.static(pathTo("../frontend/dist")));
App.use((request, response, next) => {
  let url = request.url;
  let method = request.method;

  console.log(`${method} => ${url} => ${getNowFormatted()}`);

  next();
});
App.use(cors(CORS_CONFIG));
App.use(cookieParser("secret-key", {}));
App.use(
  session({
    secret: "secret-key",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60,
      secure : true,
    },
  })
);
App.use(passport.initialize());
App.use(passport.session());

// ROUTES
App.use("/chat-app/auth", authRouter);
App.use("/chat-app/user", userRouter);
App.use("/chat-app/room", roomRouter);
App.use("/chat-app/conversation", conversationRouter);
App.use("/chat-app/message", messageRouter);
App.get("*",function(request,response){
  response.sendFile(pathTo("../frontend/dist/index.html"));
})

// SOCKET

const online_users = {};
const getUserSocketId = (id) => {
  return online_users[id];
};

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected !`);

  // Register the user as an online user
  // And send a lits of online users
  let uid = socket.handshake.query.uid;
  online_users[uid] = socket.id;

  io.emit("online_users", Object.keys(online_users));

  socket.on("message", async (message) => {
    const _message = await saveConversationMessage({
      content: message.content,
      rid: message.to,
      sid: parseInt(uid),
    });
    
    io.to([getUserSocketId(message.to), getUserSocketId(uid)]).emit(
      "message",
      _message
    );
  });

  socket.on("group_message", async (message) => {
    const _message = await saveGroupMessage({
      content: message.content,
      room_id: message.room_id,
      sid: parseInt(uid),
    });

    io.emit("group_message", _message);
  });

  socket.on("is_typing", async (rid) => {
    io.to(getUserSocketId(rid)).emit("somebody_texting_me", uid);
  });

  socket.on("stopped_typing", async (rid) => {
    io.to(getUserSocketId(rid)).emit("somebody_stopped_texting_me", uid);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected !`);

    // Remove the user from the list of online users
    // and send an updated list of online users
    delete online_users[socket.id];
    io.emit("online_users", Object.values(online_users));
  });
});

// SERVER
server.listen(PORT, () => {
  sequelize
    .authenticate({})
    .then(($) => {
      console.log(`Connection to ${sequelize.getDatabaseName()} db => OK`);
    })
    .catch(($) =>
      console.log(`Connection to ${sequelize.getDatabaseName()} db => ERROR`)
    );
});
