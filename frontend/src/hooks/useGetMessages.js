import { useQuery } from "@tanstack/react-query";
import { useChatContext } from "../context/ChatContext";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";

/**
 * 
 * @param {number} rid 
 * @returns {object}
 */
export default function useGetMessages (rid) {

    const {currentChat,setMessages} = useChatContext();

    const {data,isSuccess,isError,isPending,refetch} = useQuery({
        queryKey : ["message"],
        queryFn : async () => {

            const r = await Axios.get(`${BACKEND_ORIGIN}/chat-app/message/${rid || currentChat.id}/`,{
                withCredentials : true
            })

            // Save the messages in a state
            // so they can be displayed in the chat room
            setMessages(r.data);

            return r.data;

        }
    })

    return {
        isSuccess,
        isError,
        isPending,
        refetch
    };

}