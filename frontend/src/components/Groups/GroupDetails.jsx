import { useChatContext } from "../../context/ChatContext";
import useGetRoomUsers from "../../hooks/useGetRoomUsers";
import image from "../../assets/imgs/picture.jpg";
import { XCircleIcon, InfoIcon, UserMinusCircleIcon } from "../../assets/svg";
import { convertToDate } from "../../utils/convertTime";
import { useState } from "react";
import Loader from "../General/loader";
import useRemoveUserFromGroup from "../../hooks/useRemoveUserFromGroup";

export default function GroupDetails() {
  const {
    currentGroup,
    toggleShowRoomUsers,
    user: connectedUser,
  } = useChatContext();

  const { currentGroupMembers } = useGetRoomUsers();

  const [showDetails, setShowDetails] = useState(false);
  const { request: handleRemoveUserFromGroup, requesting } =
    useRemoveUserFromGroup();

  const conditionToShowBtn = (u) => {
    // Only show that button if
    // 1. The group is not restricted or the connected user is the creator of the group
    let cond1 = !currentGroup.restricted;
    let cond2 = currentGroup.creator_id == connectedUser.id;

    // 2. But don't show the button if the user being displayed is the connected user
    // so he can't remove himself from group.
    let cond3 = currentGroup?.creator_id !== u?.id;

    return (cond1 || cond2) && cond3;
  };

  // const data = [
  //     {
  //         id : 1,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 2,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 3,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 4,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 5,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 6,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 7,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 8,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 9,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 10,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 11,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 12,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 13,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 14,
  //         name :"John Doe"
  //     },
  //     {
  //         id : 15,
  //         name :"John Doe"
  //     }
  // ]

  return (
    <div className="group-users custom-scrollbar">
      <div className="icons">
        <button
          type="button"
          className="center"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          <InfoIcon />
        </button>
        <button
          type="button"
          className="center"
          onClick={() => toggleShowRoomUsers(false)}
        >
          <XCircleIcon />
        </button>
      </div>
      <div className="top-bar">
        <h3> {currentGroup.name} </h3>
        <div className={`optional ${showDetails ? "show-details" : undefined}`}>
          <p>{currentGroup.description}</p>
          <div className="infos-on-group">
            <span className="cell center">
              {" "}
              {currentGroupMembers?.length} membres{" "}
            </span>
            <span className="cell center">
              {" "}
              {currentGroup?.creator_id === connectedUser.id
                ? "Vous"
                : currentGroup?.creator?.name}{" "}
            </span>
            <span className="cell center">
              {" "}
              {convertToDate(currentGroup?.createdAt)}{" "}
            </span>
            {currentGroup.restricted && (
              <span className="cell-red center">Restreint</span>
            )}
          </div>
        </div>
      </div>

      <ul className="list-users">
        {currentGroupMembers?.map((user) => {
          return (
            <li key={user.id} className="user-elt">
              <div className="left">
                <div className="img-wrapper">
                  <img
                    src={user.image || image}
                    alt={`Image de profile de ${user.name}`}
                  />
                </div>
                <div className="more-infos">
                  <span> {user.name} </span>
                  {user?.email && <span>{user.email}</span>}
                </div>
              </div>

              <div className="actions">
                {conditionToShowBtn(user) && (
                  <div className="click-to-invite center">
                    {requesting ? (
                      <Loader height={20} width={20} />
                    ) : (
                      <button
                        className="center"
                        onClick={() => handleRemoveUserFromGroup(user.id)}
                      >
                        <UserMinusCircleIcon />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
