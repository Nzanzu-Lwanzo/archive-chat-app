import Axios from "axios";
import { useState } from "react";
import { BACKEND_ORIGIN } from "../../utils/constants";
import { useLoaderData, useNavigate } from "react-router-dom";
import Loader from "../General/loader";

export default function MoreActions() {
  const navigateTo = useNavigate();

  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const deleteAccount = () => {
    setIsDeletingAccount(true);

    Axios.get(`${BACKEND_ORIGIN}/chat-app/auth/sign-out/`, {
      withCredentials: true,
    })
      .then((r) => {
        if (r.status === 204) return navigateTo("/sign-up/");
        alert("COULDN'T DELETE THE ACCOUNT");
      })
      .catch((e) => {
        console.log(e);
        // TOAST MESSAGE
      })
      .finally(($) => setIsDeletingAccount(false));
  };

  return (
    <div className="box-in-modal-card">
      <h3>More actions</h3>
      <button
        type="button"
        className="exclude-button delete-account-button"
        onClick={deleteAccount}
      >
        {isDeletingAccount ? (
          <Loader height={20} width={20} ringColor="#000" trackColor="#FFF" />
        ) : (
          "Delete my account"
        )}
      </button>
    </div>
  );
}
