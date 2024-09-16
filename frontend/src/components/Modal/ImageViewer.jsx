import { useChatContext } from "../../context/ChatContext";
import Modal from "./Parent";

export default function ImageViewer () {

    const { user } = useChatContext();

    return (
        <Modal title={user.name} >
            <div className="image-viewer">
                <img src={user.image} alt="" />
            </div>
        </Modal>
    )
}