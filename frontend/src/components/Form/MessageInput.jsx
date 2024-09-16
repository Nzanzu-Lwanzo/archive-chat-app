import { useEffect, useRef } from "react";
import { SendIcon, DotsThreeVerticalIcon } from "../../assets/svg";
import { useChatContext } from "../../context/ChatContext";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";

export default function MessageInput() {
  const textareaRef = useRef();
  const { message, setMessage, currentChat, setShowRightBarOnMobile } =
    useChatContext();
  const { socket } = useSocketContext();
  const sendMessage = useSendMessage();

  useEffect(() => {
    /**
     *
     * @param {KeyboardEvent} e
     */
    const sendMessageOnEnterClick = (e) => {
      if (e.ctrlKey && e.code.toUpperCase() === "ENTER") {
        sendMessage(message);
      }
    };

    document.addEventListener("keypress", sendMessageOnEnterClick);

    return () => {
      document.removeEventListener("keypress", sendMessageOnEnterClick);
    };
  });

  let countSecondsWithoutTyping = 0;

  return (
    <div className="message-input">
      <textarea
        name="message"
        id="message"
        value={message}
        onInput={(e) => {
          setMessage(e.target.value);

          // Signal on the other side
          // that this user is typing
          socket?.emit("is_typing", currentChat.id);
        //   socket?.emit("stopped_typing", currentChat.id);

        }}
        placeholder="ctrl + Enter : envoyer"
      ></textarea>

      <div className="btns">
        <button
          type="button"
          className="center"
          onClick={(e) => {
            sendMessage(message);
          }}
        >
          <SendIcon />
        </button>
        <button type="button" className="center" onClick={()=>{
          setShowRightBarOnMobile(true);
        }}>
          <DotsThreeVerticalIcon />
        </button>
      </div>
    </div>
  );
}
