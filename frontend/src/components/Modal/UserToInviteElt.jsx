import image from "../../assets/imgs/picture.jpg";
import { UserPlusCircleIcon, UserCheckIcon } from "../../assets/svg";
import { useChatContext } from "../../context/ChatContext";
import {
  lsAddToArray,
  lsRead,
} from "../../utils/localStorage-io";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../../utils/constants";
import { useState } from "react";
import Loader from "../General/loader";

export default function UserToInviteElt({ profile, name, id, invited }) {
  const { setCurrentChat, setChats, chats, setAllUsers } = useChatContext();
  const [inviting, setInviting] = useState(false);

  const selectChatAndInvite = () => {
    /**@type {Array} */
    const allUsers = lsRead("all-users");

    // Create a conversation with this user
    setInviting(true);
    Axios.post(
      `${BACKEND_ORIGIN}/chat-app/conversation/${id}/`,
      {},
      {
        withCredentials: true,
      }
    )
      .then((r) => {
        const conversation = r.data;

        // Save the new chat in the chats state
        // so it can be displayed in the list
        // of conversations.
        setChats((prev) => [conversation, ...prev]);

        // Select this user as the current chat
        const foundUser = allUsers.find((user) => user.id === id);
        setCurrentChat(foundUser);

        // Delete this user from the list of the users
        // so it won't be displayed any more
        setAllUsers(
          /**
           * @param {Array} prev
           */
          (prev) => {
            return prev.filter((element) => element?.id !== foundUser?.id);
          }
        );

        // We will need updated in the groups(room) section.
        // Add this new user to the chat array store in localStorage
        lsAddToArray("chats", r.data, "BEFORE");
      })
      .catch((e) => {
        // Toast message
        console.log(e);
      })
      .finally(($) => {
        setInviting(false);
      });
  };

  return (
    <li>
      <div className="user">
        <div className="img-wrapper">
          <img src={profile || image} alt="Image" />
        </div>
        <span>{name}</span>
      </div>
      {!invited ? (
        <div className="click-to-invite center">
          {inviting ? (
            <Loader height={20} width={20} />
          ) : (
            <button className="center" onClick={selectChatAndInvite}>
              <UserPlusCircleIcon />
            </button>
          )}
        </div>
      ) : (
        <div className="click-to-invite center">
          <button type="button" className="center">
            <UserCheckIcon />
          </button>
        </div>
      )}
    </li>
  );
}
