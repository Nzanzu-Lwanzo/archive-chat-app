import { useChatContext } from "../context/ChatContext";
import { useSocketContext } from "../context/SocketContext";

export function useAuthenticate() {
  const { user, currentGroup } = useChatContext();

  return {
    isGroupCreator: () => user.id === currentGroup.creator_id,
  };
}

export function useCheck () {
  const { currentChat } = useChatContext();
  const { textersIds } = useSocketContext();

  return {
    isTyping: (_id) => {
      return textersIds?.map((id) => parseInt(id))?.includes(_id || currentChat.id);
    },
  };
}