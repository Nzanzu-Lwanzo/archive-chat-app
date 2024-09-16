import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { lsRead } from "../utils/localStorage-io";

const ChatContext = createContext();

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }) => {
  const [msgInput, setMsgInput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [settingsModal, toggleSettingsModal] = useState(false);
  const [engageChatModal, toggleEngageChatModal] = useState(false);
  const [addUserToGroup, toggleAddUserToGroup] = useState(false);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [user, setUser] = useState(lsRead("user"));
  const [chats, setChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [chatSection, setChatSection] = useState("conversations");
  const [rooms, setRooms] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(undefined);
  const [currentGroupMembers, setCurrentGroupMembers] = useState([]);
  const [showRoomUsers, toggleShowRoomUsers] = useState(false);
  const [currentRoomMessages, setCurrentRoomMessages] = useState([]);
  const [updatingGroup, setUpdatingGroup] = useState(false);
  const [showUpdateGroupForm, toggleShowUpdateGroupForm] = useState(false);
  const [lastGroupMessage, setLastGroupMessage] = useState({});
  const [lastConvMessage, setLastConvMessage] = useState({});
  const [showEditProfileCard, toggleShowEditProfileCard] = useState(false);
  const [showConvAndGroupsBarOnMobile, setShowConvAndGroupsBarOnMobile] = useState(false);
  const [showRightBarOnMobile, setShowRightBarOnMobile] = useState(false);

  const data = {
    msgInput,
    setMsgInput,
    messages,
    setMessages,
    settingsModal,
    toggleSettingsModal,
    message,
    setMessage,
    engageChatModal,
    toggleEngageChatModal,
    currentChat,
    setCurrentChat,
    user,
    setUser,
    setChats,
    chats,
    allUsers,
    setAllUsers,
    chatSection,
    setChatSection,
    rooms,
    setRooms,
    currentGroup,
    setCurrentGroup,
    addUserToGroup,
    toggleAddUserToGroup,
    currentGroupMembers,
    setCurrentGroupMembers,
    showRoomUsers,
    toggleShowRoomUsers,
    currentRoomMessages,
    setCurrentRoomMessages,
    updatingGroup,
    setUpdatingGroup,
    showUpdateGroupForm,
    toggleShowUpdateGroupForm,
    lastConvMessage,
    setLastConvMessage,
    showEditProfileCard,
    toggleShowEditProfileCard,
    showConvAndGroupsBarOnMobile,
    setShowConvAndGroupsBarOnMobile,
    showRightBarOnMobile,
    setShowRightBarOnMobile,
  };

  return <ChatContext.Provider value={data}> {children} </ChatContext.Provider>;
};
