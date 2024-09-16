import Header from "../components/Header/Header";
import Room from "../components/Room/Room";
import FilterAndSearch from "../components/Conversations/FilterAndSearch";
import Conversations from "../components/Conversations/Conversations";
import Groups from "../components/Groups/Groups";
import Actions from "../components/Conversations/Actions";
import { useChatContext } from "../context/ChatContext";
import {
  SocketContextProvider
} from "../context/SocketContext";
import Notifications from "../components/Notifications/Notifications";
import GroupRoom from "../components/Room/GroupRoom";
import { useEffect } from "react";
export default function Chat({}) {

  const { chatSection, showRightBarOnMobile, showConvAndGroupsBarOnMobile } =
    useChatContext();

  useEffect(() => {
    document.title = "Chat";

    return () => {};
  }, []);

  const chatSectionToRender =
    chatSection === "conversations" ? <Conversations /> : <Groups />;
  const roomToRender =
    chatSection === "conversations" ? <Room /> : <GroupRoom />;

  return (
    <SocketContextProvider>
      <div className="wrap-cards">
        <div
          className={`${
            showConvAndGroupsBarOnMobile && "show-conversations-card"
          } conversations-card`}
        >
          <FilterAndSearch />
          {chatSectionToRender}
          <Actions />
        </div>
        <div className="chat-card">{roomToRender}</div>
        <div
          className={`${showRightBarOnMobile && "show-right-bar"} right-bar`}
        >
          <Header />
          <Notifications />
          <div className="right-bottom center"></div>
        </div>
      </div>
    </SocketContextProvider>
  );
}
