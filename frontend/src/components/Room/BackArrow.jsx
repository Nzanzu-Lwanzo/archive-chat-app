import { ArrowLeftIcon } from "../../assets/svg";
import { useChatContext } from "../../context/ChatContext";

export default function BackArrow() {
  const { toggleShowConvAndGroupsBar } = useChatContext();
  return (
    <button
      className="for-mobile center"
      onClick={() => toggleShowConvAndGroupsBar(true)}
    >
      <ArrowLeftIcon />
    </button>
  );
}
