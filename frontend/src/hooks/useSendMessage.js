import { useChatContext } from "../context/ChatContext";
import { useSocketContext } from "../context/SocketContext";
import useReorganizeList from "./useReorganizeList";

export default function useSendMessage() {
  const { socket } = useSocketContext();
  const {
    chatSection,
    setMessage,
    currentChat,
    user,
    currentGroup,
    setCurrentChat,
    chats,
  } = useChatContext();

  const { reorganizeConversations } = useReorganizeList();

  return (message) => {
    if (message.trim().length === 0) return;

    if (chatSection === "conversations") {
      socket.emit("message", {
        content: message,
        to: currentChat.id,
      });

      reorganizeConversations(currentChat?.id);
      
    } else if (chatSection === "groups") {
      socket.emit("group_message", {
        content: message,
        room_id: currentGroup.id,
        uuid: currentGroup.uuid,
      });
    }

    socket?.emit("stopped_typing", currentChat.id);
    setMessage("");
  };
}
