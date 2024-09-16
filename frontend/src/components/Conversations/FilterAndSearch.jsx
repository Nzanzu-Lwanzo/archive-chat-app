import { useChatContext } from "../../context/ChatContext";
import useFilterAndSearch from "../../hooks/useFilterAndSearch";
import { lsRead } from "../../utils/localStorage-io";
import Filter from "./Filter";
import { XCircleIcon } from "../../assets/svg";

export default function FilterAndSearch() {
  const {
    chats,
    setChats,
    setRooms,
    chatSection,
    setShowConvAndGroupsBarOnMobile,
  } = useChatContext();

  const filtConvs = (value) => {
    /**@type {Array} */
    const conversations = lsRead("chats");

    setChats(
      conversations?.filter((conv) =>
        conv?.name?.toLowerCase().includes(value?.toLowerCase())
      )
    );
  };

  const filtGroups = (value) => {
    /**@type {Array} */
    const groups = lsRead("rooms");

    setRooms(
      groups?.filter((group) =>
        group?.name?.toLowerCase().includes(value?.toLowerCase())
      )
    );
  };

  const { getInput } = useFilterAndSearch({
    filter:
      chatSection === "conversations"
        ? filtConvs
        : chatSection === "groups"
        ? filtGroups
        : console.log,
  });

  return (
    <div className="filter-n-search">
      <div className="search">
        <input
          type="text"
          name="search-input"
          id="search-input"
          placeholder="Cherchez un chat"
          onInput={getInput}
        />
        <button className="center for-mobile hide-convs-and-groups-on-mobile" onClick={()=>{
          setShowConvAndGroupsBarOnMobile(false)
        }}>
          <XCircleIcon />
          </button>
      </div>
      <Filter />
    </div>
  );
}
