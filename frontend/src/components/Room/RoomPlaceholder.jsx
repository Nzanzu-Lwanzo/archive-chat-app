import Placeholder from "../General/Placeholder";

export default function RoomPlaceholder({ btn, action }) {
  return (
    <Placeholder>
      <div className="no-chat-selected center">
        <h1>Welcome on Moza Chat</h1>
        <span>A place strangers become family</span>
        <button
          type="button"
          className="action-call-button center"
          onClick={action}
        >
          {btn}
        </button>
      </div>
    </Placeholder>
  );
}
