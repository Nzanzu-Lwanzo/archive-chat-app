import { UserMinusCircleIcon, ChatsIcon, UsersIcon } from "../../assets/svg";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_ORIGIN } from "../../utils/constants";
import { useState } from "react";
import Loader from "../General/loader";
import Axios from "axios";
import { lsWrite } from "../../utils/localStorage-io";
import { useChatContext } from "../../context/ChatContext";
import { fUsername } from "../../utils/formatters";
import { useSocketContext } from "../../context/SocketContext";

export default function Actions() {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigateTo = useNavigate();
  const {
    setUser,
    setChatSection,
    chatSection,
    user,
    setShowConvAndGroupsBarOnMobile,
  } = useChatContext();
  const { socket } = useSocketContext();

  return (
    <div className="more-user-actions">
      <button
        className="btn-or-link center"
        onClick={() => {
          setLoggingOut(true);

          Axios.get(`${BACKEND_ORIGIN}/chat-app/auth/log-out/`, {
            withCredentials: true,
          })
            .then((r) => {
              if (!r.status === 200) return; // Toast message;

              // Delete the user stored in localStorage
              lsWrite(["user", {}]);

              // Set the current user to be an empty object
              setUser({});

              // Forcibly disconnect this user
              socket?.disconnect();

              navigateTo("/log-in/");
            })
            .catch((e) => {})
            .finally(($) => setLoggingOut(false));
        }}
      >
        {loggingOut ? (
          <Loader height={20} width={20} />
        ) : (
          <UserMinusCircleIcon />
        )}
      </button>
      <button
        className={`
                btn-or-link center ${
                  chatSection === "conversations" ? "active" : undefined
                }
            `}
        onClick={() => {
          setChatSection("conversations");
          setShowConvAndGroupsBarOnMobile(false);
        }}
      >
        <ChatsIcon />
      </button>
      <button
        className={`
                btn-or-link center ${
                  chatSection === "groups" ? "active" : undefined
                }
            `}
        onClick={() => {
          setChatSection("groups");
          setShowConvAndGroupsBarOnMobile(false);
        }}
      >
        <UsersIcon />
      </button>
      <span className="center connected-user-name">
        {fUsername(user?.name)}
      </span>
    </div>
  );
}
