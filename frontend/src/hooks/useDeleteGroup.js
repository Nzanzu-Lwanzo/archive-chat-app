import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";
import { lsUpdateArray } from "../utils/localStorage-io";

export default function useDeleteGroup() {
  const { currentGroup, setRooms, setCurrentGroup } = useChatContext();
  const [isDeleting, setIsDeleting] = useState();

  return {
    request: () => {
        
      setIsDeleting(true);

      Axios.delete(`${BACKEND_ORIGIN}/chat-app/room/${currentGroup.id}/`, {
        withCredentials: true,
      })
        .then((r) => {
          if (r.status === 204) {
            // Delete the group from the array of displayed groups
            setRooms(
              /**@param {Array} prev */
              (prev) => {
                return prev.filter((group) => group.id !== currentGroup?.id);
              }
            );

            // There's no current group selected
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
          } else {
            // SHOW TOAST CARD
            console.log(r);
          }
        })
        .catch((e) => {
          // SHOW TOAST CARD
          console.log(e);
        })
        .finally(($) => setIsDeleting(false));
    },
    isDeleting,
  };
}
