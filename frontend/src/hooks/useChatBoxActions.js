import { useChatContext } from "../context/ChatContext";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";
import { useState } from "react";

export function useChatBoxActions() {
  const { messages, setMessages, chatSection, setCurrentRoomMessages } =
    useChatContext();
  const [isDeleting, setIsDeleting] = useState(false);

  return {
    del: (id) => {
      setIsDeleting(true);
      Axios.delete(`${BACKEND_ORIGIN}/chat-app/message/${id}/`, {
        withCredentials: true,
      })
        .then((r) => {
          if (r.status !== 204) return alert("NOT DELETED", r.statusText);

          if (chatSection === "conversations") {
            setMessages(
              /**@param {Array} prev */
              (prev) => {
                return prev.filter((msg) => msg.id !== id);
              }
            );
          } else if (chatSection === "groups") {
            setCurrentRoomMessages(
              /**@param {Array} prev */
              (prev) => {
                return prev.filter((msg) => msg.id !== id);
              }
            );
          }
        })
        .catch((e) => {
          // TOAST MESSAGE
          console.log(e);
        })
        .finally(($) => setIsDeleting(false));
    },

    edit: () => {},

    resend: () => {},

    isDeleting,
  };
}
