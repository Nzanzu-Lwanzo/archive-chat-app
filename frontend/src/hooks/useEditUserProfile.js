import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { useChatContext } from "../context/ChatContext";
import { BACKEND_ORIGIN } from "../utils/constants";
import { lsWrite } from "../utils/localStorage-io";
import { fUserImageLink } from "../utils/formatters";

export default function useEditUserProfile () {

    const {setUser} = useChatContext();

    const {mutate,isSuccess,isError,isPending} = useMutation({
        mutationKey : ["user-edit"],
        mutationFn : async (data) => {

            const r = await Axios.patch(`${BACKEND_ORIGIN}/chat-app/user/`,data,{
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })

            if(![400,403,500,401,404].includes(r.status)) {
                setUser({...r.data,image : fUserImageLink(r.data.image) });
                lsWrite([
                  "user",
                  {
                    ...r.data,
                    image: fUserImageLink(r.data.image),
                  },
                ]);
            }

            return r.data

        }
    })

    return {mutate,isSuccess,isError,isPending};
}