import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";
import { useChatContext } from "../context/ChatContext";
import { useState } from "react";

export default function useGetRoomUsers () {

    const {currentGroup,currentGroupMembers,setCurrentGroupMembers} = useChatContext();
    const [ids,setIds] = useState([]);

    const {data,isPending,isSuccess,isError,refetch} = useQuery({
        queryKey : ["room-user"],
        queryFn : async () => {

            const r = await Axios.get(`${BACKEND_ORIGIN}/chat-app/room/${currentGroup.id}/`,{
                withCredentials : true
            });

            // Save the ids of the users in a an array
            setIds(r.data.map(user => parseInt(user.id)));

            // Store the list in a state so they can be
            // displayed in the list.
            setCurrentGroupMembers(r.data);

            return r.data;
        }
    });

    return {ids,data,isPending,isSuccess,isError,refetch,setCurrentGroupMembers,currentGroupMembers}

}