import ChatBox from "./ChatBox";
import { useChatContext } from "../../context/ChatContext";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  PenNibIcon,
  TrashIcon,
  DotsThreeVerticalIcon,
  UserPlusCircleIcon,
  GearIcon,
  UsersIcon,
  ArrowLeftIcon,
} from "../../assets/svg";
import Form from "../Form/Form";
import image from "../../assets/imgs/picture.jpg";
import Placeholder, { OnNoDataPlaceholder } from "../General/Placeholder";
import Loader from "../General/loader";
import { OnErrorPlaceholder } from "../General/Placeholder";
import RoomPlaceholder from "./RoomPlaceholder";
import AddUserToGroup from "../Modal/AddUserToGroup";
import GroupDetails from "../Groups/GroupDetails";
import useDeleteGroup from "../../hooks/useDeleteGroup";
import { useAuthenticate } from "../../hooks/useValidate";
import useRemoveUserFromGroup from "../../hooks/useRemoveUserFromGroup";
import useGetRoomMessages from "../../hooks/useGetRoomMessages";
import { lsRead, lsWrite } from "../../utils/localStorage-io";

export default function GroupRoom() {
  const {
    currentGroup,
    setCurrentGroup,
    user: connectedUser,
    addUserToGroup,
    toggleAddUserToGroup,
    showRoomUsers,
    toggleShowRoomUsers,
    currentRoomMessages,
    toggleShowUpdateGroupForm,
    setShowConvAndGroupsBarOnMobile,
    setShowRightBarOnMobile,
    rooms,
  } = useChatContext();
  const chatBoxRef = useRef();

  const [showOptionsCard, setShowOptionsCard] = useState(false);
  const { isDeleting, request: delGroup } = useDeleteGroup();
  const { isGroupCreator } = useAuthenticate();

  const { isSuccess, isError, isPending, refetch } = useGetRoomMessages();

  useEffect(() => {
    /**@type {HTMLDivElement} */
    const element = chatBoxRef.current;

    element?.scrollIntoView({ behavior: "smooth" });
  }, [currentRoomMessages]);

  const { request: removeUserFromGroup, requesting } = useRemoveUserFromGroup();

  const updateGroup = () => {
    toggleShowUpdateGroupForm((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, [currentGroup]);

  return (
    <Fragment>
      {currentGroup ? (
        <div className="chat-card-room">
          <div className="chat-room-top">
            <div className="user">
              <button
                className="center for-mobile show-convervsations-groups"
                onClick={() => {
                  setShowConvAndGroupsBarOnMobile(true);
                }}
              >
                <ArrowLeftIcon />
              </button>
              <div className="img-wrapper">
                <img src={currentGroup?.image || image} alt="Image" />
              </div>
              <span>{currentGroup?.name || "Invalid Chat"}</span>
            </div>

            <ul>
              <li>
                <button
                  className="center actions-in-room"
                  onClick={() => toggleShowRoomUsers(true)}
                >
                  <UsersIcon />
                </button>
              </li>

              {(!currentGroup.restricted ||
                connectedUser.id === currentGroup.creator_id) && (
                <li>
                  <button
                    className="center actions-in-room"
                    onClick={() => toggleAddUserToGroup(true)}
                  >
                    <UserPlusCircleIcon />
                  </button>

                  {addUserToGroup && <AddUserToGroup />}
                </li>
              )}
              <li className="float-card-container">
                <button
                  className="center actions-in-room"
                  onClick={() => {
                    setShowOptionsCard((prev) => !prev);
                  }}
                >
                  <DotsThreeVerticalIcon />
                </button>

                {showOptionsCard && (
                  <div className="options float-card">
                    {isGroupCreator() && (
                      <>
                        <button
                          type="button"
                          className="exclude-button"
                          onClick={updateGroup}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="exclude-button"
                          onClick={()=>{
                            delGroup();
                            localStorage.removeItem("last-group");
                          }}
                        >
                          {isDeleting ? (
                            <Loader height={20} width={20} />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      className="exclude-button"
                      onClick={() => {
                        removeUserFromGroup(connectedUser.id);
                        localStorage.removeItem("last-group");
                      }}
                    >
                      {requesting ? <Loader height={20} width={20} /> : "Leave"}
                    </button>
                    <button type="button" className="exclude-button">
                      Report
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="message-cards custom-scrollbar">
            {isSuccess ? (
              currentRoomMessages?.length !== 0 ? (
                currentRoomMessages?.map((message) => {
                  let who = message.sid === connectedUser.id ? "me" : "em";

                  return (
                    <div
                      key={message.id}
                      className={`wrap-chatbox ${who}`}
                      ref={chatBoxRef}
                    >
                      <ChatBox message={message} who={who} isGroupal={true} />
                    </div>
                  );
                })
              ) : (
                <OnNoDataPlaceholder message="No message found." />
              )
            ) : isError ? (
              <OnErrorPlaceholder
                action={refetch}
                message={"Failure. Click to retry."}
              />
            ) : isPending ? (
              <Loader height={40} width={40} />
            ) : currentRoomMessages.length === 0 ? (
              <Placeholder>
                <div className="no-message">
                  Il n'y a aucun message dans ce groupe. Engagez la conversation.
                </div>
              </Placeholder>
            ) : null}
          </div>

          <Form />

          {/* CARD TO DISPLAY ALL THE USERS OF A GROUP  */}
          {showRoomUsers && <GroupDetails />}
        </div>
      ) : (
        <RoomPlaceholder
          btn="Dernier groupe"
          action={() => {
            const lastGroup =
              lsRead("last-group") || Array.from(lsRead("rooms")).at(-1);

            if (!lastGroup) {
              if(!rooms?.length === 0) {
                setShowConvAndGroupsBarOnMobile(true);   
              } else {
                setShowRightBarOnMobile(true);
              }
              
              return;
            }

            setCurrentGroup(lastGroup);
          }}
        />
      )}
    </Fragment>
  );
}
