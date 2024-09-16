import { DoubleCheckIcon, PenNibIcon, TrashIcon } from "../../assets/svg";
import { useChatBoxActions } from "../../hooks/useChatBoxActions";
import { getMessageTime } from "../../utils/convertTime";
import { fUsername } from "../../utils/formatters";
import Loader from "../General/loader";

export default function ChatBox({ message, who, isGroupal }) {
  const { del, isDeleting, edit } = useChatBoxActions();

  let hasBeenRead = true;

  return (
    <>
      {who === "me" && (
        <div className="options">
          <button
            type="button"
            className="center"
            onClick={() => del(message.id)}
          >
            {!isDeleting ? <TrashIcon /> : <Loader height={15} width={15} />}
          </button>
          <button type="button" className="center" onClick={edit}>
            <PenNibIcon />
          </button>
        </div>
      )}

      <div className={`chat-box`}>
        <p>{message.content}</p>
        <div
          className={`message-time ${
            isGroupal && "align-groupal-sender-cell-name"
          }`}
        >
          {isGroupal && (
            <span className="groupal-sender">
              {fUsername(message.sender?.name)}
            </span>
          )}
          {!isGroupal && who === "me" && (
            <span className={`center ${hasBeenRead && "has-been-read"}`}>
              <DoubleCheckIcon />
            </span>
          )}
          <span
            className={`${
              !isGroupal && hasBeenRead && who === "me"
                ? "cell"
                : "no-read-time-cell"
            }`}
          >
            {getMessageTime(message.createdAt)}
          </span>
        </div>
      </div>
    </>
  );
}
