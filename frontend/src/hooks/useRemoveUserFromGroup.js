import { useState } from "react";
import { BACKEND_ORIGIN } from "../utils/constants";
import Axios from "axios";
import { useChatContext } from "../context/ChatContext";
import { lsUpdateArray } from "../utils/localStorage-io";

export default function useRemoveUserFromGroup(onSuccess) {
  const [requesting, setRequesting] = useState(false);
  const {
    currentGroup,
    setCurrentGroup,
    toggleShowRoomUsers,
    setCurrentGroupMembers,
    setRooms,
    user: connectedUser,
  } = useChatContext();

  return {
    request: (user_to_remove_id) => {
      let url = `${BACKEND_ORIGIN}/chat-app/room/${currentGroup.id}/${user_to_remove_id}/`;

      setRequesting(true);
      Axios.delete(url, { withCredentials: true })
        .then((r) => {
          r.status === 201 &&
            setCurrentGroupMembers(
              /**@param {Array} prev */
              (prev) => {
                return prev.filter(
                  (element) => element.id !== user_to_remove_id
                );
              }
            );

          // If the user deleted himself,
          // delete the group from the list of groups
          // and close the details card and select no group
          if (connectedUser?.id === r.data?.id) {
            setRooms(
              /**@param {Array} prev */
              (prev) => {
                return prev.filter((group) => group.id !== currentGroup.id);
              }
            );
            toggleShowRoomUsers(false);
            setCurrentGroup(undefined);
            lsUpdateArray(
              {
                read: "rooms",
                lkp: {
                  key: "id",
                  val: currentGroup?.id,
                },
              },
              false
            );
          }
        })
        .catch((e) => console.log(e))
        .finally(($) => setRequesting(false));
    },
    requesting,
  };
}
