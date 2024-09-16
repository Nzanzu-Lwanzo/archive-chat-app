import Modal from "./Parent";
import { useChatContext } from "../../context/ChatContext";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../../utils/constants";
import UserToInviteElt from "./UserToInviteElt";
import { lsRead, lsWrite } from "../../utils/localStorage-io";
import { Suspense } from "react";
import Loader from "../General/loader";
import {
  OnErrorPlaceholder,
  OnNoDataPlaceholder,
} from "../General/Placeholder";
import { checkIsInvited } from "../../utils/checkers";
import { SearchIcon } from "../../assets/svg";
import useFilterAndSearch from "../../hooks/useFilterAndSearch";

export default function Invite() {
  const { toggleEngageChatModal, chats, setAllUsers, allUsers } =
    useChatContext();

    const {getInput,isSearching,result,search} = useFilterAndSearch({
      filter : (value)=>{

        /**@type {Array} */
        const users = lsRead("all-users");
        setAllUsers((prev) =>
          users?.filter((user) =>
            user?.name?.toLowerCase().startsWith(value.toLowerCase())
          )
        );

      },
      link : "/chat-app/user/",
      handleResult : (users) => {

      }
    })

  const { data, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const r = await Axios.get(`${BACKEND_ORIGIN}/chat-app/user/all/`, {
        withCredentials: true,
      });

      // Store all the users in localStorage
      r.data && lsWrite(["all-users", r.data]);

      // Keep all the users in a state
      setAllUsers(r.data);

      return r.data;
    },
  });

  return (
    <Modal
      title={"Inviter"}
      onClose={() => {
        toggleEngageChatModal(false);
      }}
      moreInHeader={
        <div className="search-form">
          <input
            type="search"
            name="search-input"
            placeholder="Filter and search "
            id="search-input"
            onInput={getInput}
          />
          <button className="center exclude-button" onClick={search}>
            {isSearching ? <Loader height={18} width={18} /> : <SearchIcon />}
          </button>
        </div>
      }
    >
      <ul className="lister">
        {isPending ? (
          <Loader height={40} width={40} />
        ) : isSuccess ? (
          allUsers?.length !== 0 ? (
            allUsers?.map((user) => {
              if (!checkIsInvited(chats, user.id)) {
                return (
                  <Suspense
                    key={user.id}
                    fallback={<Loader height={40} width={40} />}
                  >
                    <UserToInviteElt
                      key={user.id}
                      name={user.name}
                      profile={user.image}
                      id={user.id}
                      invited={checkIsInvited(chats, user.id)}
                    />
                  </Suspense>
                );
              }
            })
          ) : (
            <OnNoDataPlaceholder message="Aucun utilisateur trouvé !" />
          )
        ) : (
          <OnErrorPlaceholder
            message="Echec. Réessayez !"
            action={refetch}
          />
        )}
      </ul>
    </Modal>
  );
}
