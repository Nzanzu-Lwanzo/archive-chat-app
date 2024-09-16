import { useChatContext } from "../context/ChatContext"

export default function useGetLastMessage() {

    const { currentGroup, currentChat } = useChatContext();

    return {
        lastInGroup : () => {
            

        },

        lastInConv : () => {

        }
    }
}