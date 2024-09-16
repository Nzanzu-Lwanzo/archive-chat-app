import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";
import { useChatContext } from "../context/ChatContext";

export default function useGetRoomMessages() {
  const { setCurrentRoomMessages, currentGroup } = useChatContext();

  const { data, isSuccess, isError, isPending, refetch } = useQuery({
    queryKey: ["room-messages"],
    queryFn: async () => {
      const r = await Axios.get(
        `${BACKEND_ORIGIN}/chat-app/room/messages/${currentGroup.id}/`,
        {
          withCredentials: true,
        }
      );

      setCurrentRoomMessages(r.data);

      return r.data;
    },
  });

  return { isSuccess, isError, isPending, refetch };
}
