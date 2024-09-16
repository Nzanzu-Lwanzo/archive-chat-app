import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";
import { lsWrite } from "../utils/localStorage-io";
import { useChatContext } from "../context/ChatContext";

export default function useGetGroups () {

    const {setRooms} = useChatContext();

    const {data,isSuccess,isError,isPending,refetch} = useQuery({
        queryKey : ["groups"],
        queryFn : async () => {

            const r = await Axios.get(`${BACKEND_ORIGIN}/chat-app/room/`,{
                withCredentials : true
            });

            // Store the rooms in a state
            setRooms(r.data);

            // Store all the rooms in localStorage
            lsWrite(["rooms",r.data]);

            return r.data;
        }
    })


    return {data,isSuccess,isError,isPending,refetch};

}