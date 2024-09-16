import image from "../../assets/imgs/picture.jpg";
import { UserPlusCircleIcon, UserMinusCircleIcon } from "../../assets/svg";
import { useChatContext } from "../../context/ChatContext";
import { lsRead } from "../../utils/localStorage-io";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../../utils/constants";
import { useState } from "react";
import Loader from "../General/loader";

export default function GroupUserElt({ profile, name, id, remove }) {
  const { currentGroup } = useChatContext();
  const [requesting, setRequesting] = useState(false);

  const handleAddUserToGroup = async () => {
    setRequesting(true);
    let url = `${BACKEND_ORIGIN}/chat-app/room/${currentGroup.id}/${id}/`;

    Axios.post(url, {}, { withCredentials: true })
      .then((r) => r.status === 201 && remove(r.data?.id))
      .catch((e) => console.log(e))
      .finally(($) => setRequesting(false));
  };

  return (
    <li>
      <div className="user">
        <div className="img-wrapper">
          <img src={profile || image} alt="Image" />
        </div>
        <span>{name}</span>
      </div>
      {
        <div className="click-to-invite center">
          {requesting ? (
            <Loader height={20} width={20} />
          ) : (
            <button className="center" onClick={handleAddUserToGroup}>
              <UserPlusCircleIcon />
            </button>
          )}
        </div>
      }
    </li>
  );
}
