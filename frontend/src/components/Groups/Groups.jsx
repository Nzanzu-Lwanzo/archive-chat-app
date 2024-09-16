import GroupElt from "./GroupElt";
import useGetGroups from "../../hooks/useGetRooms";
import Loader from "../General/loader";
import {
  OnErrorPlaceholder,
  OnNoDataPlaceholder,
} from "../General/Placeholder";
import { Fragment } from "react";
import { useChatContext } from "../../context/ChatContext";
import { lsWrite } from "../../utils/localStorage-io";

export default function Groups() {
  const { isPending, isSuccess, isError, refetch } = useGetGroups();
  const { rooms, currentGroup, setCurrentGroup } = useChatContext();

  return (
    <>
      <ul
        draggable="false"
        className="list-users-n-conversations custom-scrollbar"
      >
        {isPending ? (
          <Loader height={40} width={40} />
        ) : isError ? (
          <OnErrorPlaceholder
            action={refetch}
            message={"Echec ! Réessayez !"}
          />
        ) : rooms?.length !== 0 ? (
          rooms?.map((group) => {
            return (
              <Fragment key={group?.id || Date.now()}>
                <GroupElt
                  isCurrentGroup={currentGroup?.id === group.id}
                  group={group}
                  selectGroup={() => {
                    setCurrentGroup(group);
                    lsWrite(["last-group", group]);
                  }}
                />
              </Fragment>
            );
          })
        ) : (
          <OnNoDataPlaceholder message="Aucun groupe trouvé" bg="ON_DARK" />
        )}
      </ul>
    </>
  );
}
