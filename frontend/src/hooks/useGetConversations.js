import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";
import { useChatContext } from "../context/ChatContext";
import { lsWrite } from "../utils/localStorage-io";
import { useState } from "react";

export default function useGetConversations () {

    const {setChats} = useChatContext();
    const [ids,setIds] = useState([]);

    const {isPending,isError,isSuccess,refetch} = useQuery({
        queryKey : ["conversation"],
        queryFn : async () => {

            const r = await Axios.get(`${BACKEND_ORIGIN}/chat-app/conversation/`,{
                withCredentials : true
            })

            // r.data should be an array of objects
            // New conversations always come at the top of the list
            setChats(r.data);

            // Save the ids of the users in a an array
            setIds(r.data.map(user => parseInt(user.id)));

            // Write the conversations to localStorage
            // so that we can easily determine
            // what conversation has been selected
            lsWrite(["chats",r.data]);

            return r.data;
        }
    })


    return {ids,isPending,isError,isSuccess,refetch}
}