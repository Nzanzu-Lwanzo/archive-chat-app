import image from "../../assets/imgs/picture.jpg";
import { useChatContext } from "../../context/ChatContext";
import { useSocketContext } from "../../context/SocketContext";
import { useCheck } from "../../hooks/useValidate";
import { lsWrite } from "../../utils/localStorage-io";

export default function ConversationElt({ isCurrentChat, online, conversation }) {
  const { setCurrentChat, setShowConvAndGroupsBarOnMobile } = useChatContext();
  const { isTyping } = useCheck();

  const selectChat = () => {
    setCurrentChat(conversation);
    lsWrite(["last-conversation", conversation]);
    setShowConvAndGroupsBarOnMobile(false);
  };

  return (
    <li
      draggable="false"
      className={isCurrentChat ? "current-chat" : undefined}
      onClick={selectChat}
    >
      <div className="user">
        <div className="img-wrapper">
          <img src={conversation?.image || image} alt="Image" />
        </div>
        <div className="user-n-alii">
          <span>{conversation?.name}</span>
          {isTyping(conversation?.id) && (
            <span className="last-message">
              en train d'écrire ...
            </span>
          )}
        </div>
      </div>
      <span
        className={`counter-and-online-indicator center ${
          online ? "online" : undefined
        }`}
      >
        0
      </span>
    </li>
  );
}
