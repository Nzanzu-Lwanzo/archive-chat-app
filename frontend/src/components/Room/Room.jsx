import ChatBox from "./ChatBox";
import { useChatContext } from "../../context/ChatContext";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DotsThreeVerticalIcon, ArrowLeftIcon } from "../../assets/svg";
import Form from "../Form/Form";
import image from "../../assets/imgs/picture.jpg";
import Placeholder, { OnNoDataPlaceholder } from "../General/Placeholder";
import useGetMessages from "../../hooks/useGetMessages";
import Loader from "../General/loader";
import { OnErrorPlaceholder } from "../General/Placeholder";
import RoomPlaceholder from "./RoomPlaceholder";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../../utils/constants";
import { lsRead, lsWrite } from "../../utils/localStorage-io";
import { useSocketContext } from "../../context/SocketContext";

export default function Room() {
  const {
    messages,
    currentChat,
    user,
    setCurrentChat,
    setChats,
    setShowConvAndGroupsBarOnMobile,
    setShowRightBarOnMobile,
    chats
  } = useChatContext();
  const { onlineUsers, textersIds } = useSocketContext();
  const chatBoxRef = useRef();
  const { isSuccess, isError, isPending, refetch } = useGetMessages(
    currentChat?.id
  );
  const [showOptionsCard, setShowOptionsCard] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    /**@type {HTMLDivElement} */
    const element = chatBoxRef.current;

    element?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    refetch();
  }, [currentChat]);

  const deleteConversation = (permanentDelete = false) => {
    permanentDelete ? setIsDeleting(true) : setIsBlocking(true);

    Axios.delete(
      `${BACKEND_ORIGIN}/chat-app/conversation/${currentChat.id}${
        permanentDelete ? "/?permanent=true" : "/"
      }`,
      {
        withCredentials: true,
      }
    )
      .then((r) => {
        if (r.status === 204) {
          // Remove the user from the list of chats
          // set currentChat to undefined
          setChats(
            /**@param {Array} prev */
            (prev) => {
              return prev.filter((chat) => chat?.id !== currentChat?.id);
            }
          );

          setCurrentChat(false);

          lsUpdateArray(
             {
               read: "chats",
               lkp: {
                 key: "id",
                 val: currentChat?.id,
               },
             },
             false
           );
        } else {
          // TOAST MESSAGE
          console.log(r);
        }

        setShowOptionsCard(false);
      })
      .catch((e) => {
        // TOAST MESSAGE
        console.log(e);
      })
      .finally(($) => {
        setIsBlocking(false);
        setIsDeleting(false);
      });
  };

  return (
    <Fragment>
      {currentChat ? (
        <div className="chat-card-room">
          <div className="chat-room-top">
            <div className="user">
              <button className="center for-mobile show-convervsations-groups" onClick={()=>{
                setShowConvAndGroupsBarOnMobile(true);
              }}>
                <ArrowLeftIcon />
              </button>
              <div className="img-wrapper">
                <img src={currentChat?.image || image} alt="Image" />
              </div>
              <span>{currentChat?.name || "Invalid Chat"}</span>
              {onlineUsers?.includes(currentChat?.id) && (
                <span className="is-online center">
                  <span className="dot"></span>
                </span>
              )}
            </div>

            <ul>
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
                    {currentChat?.email && (
                      <button type="button" className="exclude-button">
                        {currentChat.email}
                      </button>
                    )}
                    <button type="button" className="exclude-button">
                      Report
                    </button>
                    <button
                      type="button"
                      className="exclude-button"
                      onClick={() => {
                        deleteConversation(false);
                        localStorage.removeItem("last-conversation");
                      }}
                    >
                      {isBlocking ? <Loader height={20} width={20} /> : "Block"}
                    </button>
                    <button
                      type="button"
                      className="exclude-button"
                      onClick={() => {
                        deleteConversation(true);
                        localStorage.removeItem("last-conversation");
                      }}
                    >
                      {isDeleting ? (
                        <Loader height={20} width={20} />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="message-cards custom-scrollbar">
            {isSuccess ? (
              messages.length !== 0 ? (
                messages?.map((message) => {
                  let who = message.sid === user.id ? "me" : "em";

                  return (
                    <>
                      <div
                        key={message.id}
                        className={`wrap-chatbox ${who}`}
                        ref={chatBoxRef}
                      >
                        <ChatBox
                          message={message}
                          who={who}
                          isGroupal={false}
                          key={message.id}
                        />
                      </div>
                    </>
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
            ) : messages.length === 0 ? (
              <Placeholder>
                <div className="no-message">
                  Vous n'avez aucune discussion avec cet utilisateur. Engagez la conversation.
                </div>
              </Placeholder>
            ) : null}

          </div>

          <Form />
        </div>
      ) : (
        <RoomPlaceholder
          btn={"Dernière conversation"}
          action={() => {
            const lastConv = lsRead("last-conversation") || Array.from(lsRead("chats")).at(-1);

            if(!lastConv) {
              if(!chats?.length === 0) {
                setShowConvAndGroupsBarOnMobile(true);
              }  else {
                setShowRightBarOnMobile(true)
              }
              return
            }

            setCurrentChat(lastConv);
          }}
        />
      )}
    </Fragment>
  );
}
