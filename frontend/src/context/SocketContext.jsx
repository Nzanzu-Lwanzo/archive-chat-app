import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { BACKEND_ORIGIN } from "../utils/constants";
import { useChatContext } from "./ChatContext";
import useReorganizeList from "../hooks/useReorganizeList";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const {
    user,
    setMessages,
    setCurrentRoomMessages,
    currentChat,
    setCurrentChat,
    chats
  } = useChatContext();
  const [socket, setSocket] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [textersIds, setTextersIds] = useState([]);
  const { reorganizeConversations } = useReorganizeList();

  useEffect(() => {
    // ****************************************

    const socket = io.connect(BACKEND_ORIGIN, {
      query: {
        uid: user.id,
      },
    });

    setSocket(socket);

    // *****************************************

    const handleOnlineUsers = (online_users) => {
      // online_users is an array of ids in string
      const onus = online_users.map((onu) => parseInt(onu));
      setOnlineUsers(onus);
    };

    const handleSingleMessageReceipt = (message) => {

      setMessages((prev) => [...prev, message]);

      if(user?.id === message?.rid) {
        // Put the sender of this message
        // on top of the list of conversations
        reorganizeConversations(message.sid, (rid) => {
          !currentChat &&
            setCurrentChat(chats.find((chat) => chat?.id == rid));
        });
      }

    };

    const handleGroupMessageReceipt = (message) => {
      setCurrentRoomMessages((prev) => [...prev, message]);
    };

    const handleSignalTyping = (texter_id) => {
      setTextersIds((prev) => [...prev, texter_id]);
    };

    const handleSignalStoppedTyping = (texter_id) => {
      setTextersIds((prev) => prev.filter((id) => id !== texter_id));
    };

    socket?.on("online_users", handleOnlineUsers);
    socket.on("message", handleSingleMessageReceipt);
    socket.on("group_message", handleGroupMessageReceipt);
    socket.on("somebody_texting_me", handleSignalTyping);
    socket.on("somebody_stopped_texting_me", handleSignalStoppedTyping);

    return () => {
      socket?.off("online_users", handleOnlineUsers);
      socket.off("message", handleSingleMessageReceipt);
      socket.off("group_message", handleGroupMessageReceipt);
      socket.off("somebody_texting_me", handleSignalTyping);
    };
  }, []);

  const [notificationsList, setNotificationsList] = useState([]);

  const data = {
    socket,
    setSocket,
    notificationsList,
    setNotificationsList,
    onlineUsers,
    textersIds,
  };

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
};
