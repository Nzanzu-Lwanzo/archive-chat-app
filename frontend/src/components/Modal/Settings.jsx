import Modal from "./Parent";
import { useChatContext } from "../../context/ChatContext";
import Preferences from "./Preferences";
import EditProfile from "./EditProfile";
import MoreActions from "./MoreActions";

export default function Settings() {
  const { toggleSettingsModal } = useChatContext();

  return (
    <Modal
      title={"Settings"}
      onClose={() => {
        toggleSettingsModal(false);
      }}
    >
      <Preferences />
      <MoreActions />
    </Modal>
  );
}
