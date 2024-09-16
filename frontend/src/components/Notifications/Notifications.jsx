import { useChatContext } from "../../context/ChatContext";
import { useSocketContext } from "../../context/SocketContext";
import { DEFAULT_NOTIFICATIONS } from "../../utils/constants";
import Notification from "./Notification";

export default function Notifications() {
  const { user } = useChatContext();
  const { notificationsList } = useSocketContext();

  return (
    <div className="notifications-container">
      {/* <h2 className="displayed-section">Notifications</h2> */}

      <ul className="custom-scrollbar">
        {!user?.image && (
          <Notification msg={DEFAULT_NOTIFICATIONS.NO_PROFILE_IMAGE.message} />
        )}
        {notificationsList?.map((notification) => {
          return (
            <Notification key={notification.id} msg={notification.message} />
          );
        })}

        <Notification msg={"No message in notif"} key={1} />
        <Notification msg={"No message in notif"} key={2} />
        <Notification msg={"No message in notif"} key={3} />
        <Notification msg={"No message in notif"} key={4} />
        <Notification msg={"No message in notif"} key={5} />
        <Notification msg={"No message in notif"} key={6} />
        <Notification msg={"No message in notif"} key={7} />
        <Notification msg={"No message in notif"} key={8} />
      </ul>
    </div>
  );
}
