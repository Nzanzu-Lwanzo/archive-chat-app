import { useChatContext } from "../../context/ChatContext";
import {
  PlusCircleIcon,
  BellIcon,
  GearIcon,
  HomeIcon,
  UserIcon,
  XCircleIcon,
  ArrowLeftIcon
} from "../../assets/svg";
import Settings from "../Modal/Settings";
import Invite from "../Modal/Invite";
import NewGroup from "../Modal/NewGroup";
import UpdateGroup from "../Modal/UpdateGroup";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import EditProfile from "../Modal/EditProfile";

const subscribe = (callback) => {
  window.addEventListener("online",callback);
  window.addEventListener("offline",callback);

  return ()=>{
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  }
}

const getSnapshot = ()=>{
  return navigator.onLine;
}

export default function Header() {
  const {
    toggleSettingsModal,
    settingsModal,
    engageChatModal,
    toggleEngageChatModal,
    chatSection,
    showUpdateGroupForm,
    showEditProfileCard,
    toggleShowEditProfileCard,
    setShowRightBarOnMobile,
    setShowConvAndGroupsBarOnMobile,
  } = useChatContext();

  const modalToDisplay =
    chatSection === "conversations" ? <Invite /> : <NewGroup />;

  const isOnline = useSyncExternalStore(subscribe,getSnapshot);

  return (
    <div className="chat-card-header">
      <div className="contains-icons">
        <div>
          <button
            type="button"
            className="center header-action"
            onClick={() => setShowConvAndGroupsBarOnMobile(true)}
          >
            <ArrowLeftIcon />
          </button>
        </div>

        <div>
          {isOnline ? (
            <span className="center cell">Online</span>
          ) : (
            <span className="center cell-red">Offline</span>
          )}
        </div>

        <div>
          <button
            type="button"
            className="center header-action"
            onClick={() => toggleShowEditProfileCard(true)}
          >
            <UserIcon />
          </button>

          {showEditProfileCard && <EditProfile />}
        </div>

        <div className="center">
          <button
            type="button"
            className="center header-action"
            onClick={() => toggleEngageChatModal(true)}
          >
            <PlusCircleIcon />
          </button>

          {engageChatModal && modalToDisplay}
          {showUpdateGroupForm && <UpdateGroup />}
        </div>

        <div>
          <button
            type="button"
            className="center header-action"
            onClick={() => toggleSettingsModal(true)}
          >
            <GearIcon />
          </button>

          {settingsModal && <Settings />}
        </div>

        <div>
          <Link className="center header-action" to="/">
            <HomeIcon />
          </Link>
        </div>

        <div
          type="button"
          className="center header-action for-mobile show-right-bar-on-mobile"
          onClick={() => setShowRightBarOnMobile(false)}
        >
          <XCircleIcon />
        </div>
      </div>
    </div>
  );
}
