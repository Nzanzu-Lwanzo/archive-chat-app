import { BACKEND_ORIGIN } from "../utils/constants";
import { Link } from "react-router-dom";
import Auth from "../components/General/Auth";
import useSendAuthData from "../hooks/useSendAuthData";
import Loader from "../components/General/loader";
import { useEffect } from "react";

export default function LogIn() {
  const { mutate, isPending } = useSendAuthData("/chat-app/auth/log-in/");
  useEffect(() => {
    document.title = "Log In";

    return () => {};
  }, []);

  return (
    <Auth
      title="Log In"
      action={`${BACKEND_ORIGIN}/chat-app/auth/log-in/`}
      sendAuthData={(data) => {
        mutate(data);
      }}
    >
      <button type="submit">
        {isPending ? <Loader height={20} width={20} /> : "Submit"}
      </button>

      <Link to="/sign-up/" className="switch-auth-cards center">
        Je n'ai pas de compte
      </Link>
    </Auth>
  );
}
