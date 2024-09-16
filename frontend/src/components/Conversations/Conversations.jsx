import ConversationElt from "./ConversationElt";
import useGetConversations from "../../hooks/useGetConversations";
import Loader from "../General/loader";
import {
  OnErrorPlaceholder,
  OnNoDataPlaceholder,
} from "../General/Placeholder";
import { useChatContext } from "../../context/ChatContext";
import { Fragment } from "react";
import { useSocketContext } from "../../context/SocketContext";

export default function Conversations() {
  const { isPending, isError, isSuccess, refetch } = useGetConversations();

  const { currentChat, chats } = useChatContext();
  const { onlineUsers } = useSocketContext();

  return (
    <ul
      draggable="false"
      className="list-users-n-conversations custom-scrollbar"
    >
      {isPending ? (
        <Loader height={40} width={40} />
      ) : isError ? (
        <OnErrorPlaceholder
          action={refetch}
          message={"Failure. Click to retry."}
        />
      ) : chats?.length !== 0 ? (
        chats?.map((conversation) => {          
          return (
            <Fragment key={conversation?.chatswith?.id || Date.now()}>
              <ConversationElt
                conversation={conversation}
                isCurrentChat={currentChat?.id === conversation?.id}
                online={onlineUsers?.includes(conversation?.id)}
              />
            </Fragment>
          );
        })
      ) : (
        <OnNoDataPlaceholder message="No conversation found." bg="ON_DARK" />
      )}
    </ul>
  );
}
