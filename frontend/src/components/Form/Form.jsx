import { useChatContext } from "../../context/ChatContext";
import MessageInput from "./MessageInput";

export default function Form() {
  const { msgInput, setMsgInput } = useChatContext();

  return (
    <div className="chat-message-form center">
      <MessageInput />
    </div>
  );
}
