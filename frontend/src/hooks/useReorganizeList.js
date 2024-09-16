import { useChatContext } from "../context/ChatContext";

export default function useReorganizeList() {

  const { setChats, setCurrentChat, chats } = useChatContext();

  return {
    reorganizeConversations: (id,cb) => {

      setChats(
        /**@param {Array} prev */
        (prev) => {
          let _chat = prev.find((chat) => chat.id === id);
          return [_chat, ...prev.filter((chat) => chat.id !== id)];
        }
      );

      if(typeof cb === "function") cb(id);
    },
    reorganizeGroups: () => {},
  };
}
