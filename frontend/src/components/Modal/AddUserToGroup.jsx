import Modal from "./Parent";
import { useChatContext } from "../../context/ChatContext";
import { lsRead } from "../../utils/localStorage-io";
import GroupUserElt from "./GroupUserElt";
import useGetRoomUsers from "../../hooks/useGetRoomUsers";
import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { OnNoDataPlaceholder } from "../General/Placeholder";

export default function AddUserToGroup() {
  const { toggleAddUserToGroup, chats } = useChatContext();
  const {} = useGetConversations();
  const [userEngagedChats, setUserEngagedChats] = useState(chats);
  const { ids } = useGetRoomUsers();

  return (
    <Modal
      title={"Inviter"}
      onClose={() => {
        toggleAddUserToGroup(false);
      }}
    >
      <ul className="lister">
        {userEngagedChats?.length !== 0 ? (
          userEngagedChats?.map((user) => {
            if (!ids.includes(user.id)) {
              return (
                <GroupUserElt
                  key={user.id}
                  name={user.name}
                  profile={user.image}
                  id={user.id}
                  remove={(id) => {
                    setUserEngagedChats(
                      /**@param {Array} prev */
                      (prev) => {
                        return prev.filter((element) => element.id !== id);
                      }
                    );
                  }}
                />
              );
            }
          })
        ) : (
          <OnNoDataPlaceholder message="Aucune conversation trouvée" />
        )}
      </ul>
    </Modal>
  );
}
