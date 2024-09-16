import Auth from "../components/General/Auth";
import useSendAuthData from "../hooks/useSendAuthData";
import { BACKEND_ORIGIN } from "../utils/constants";
import { Link } from "react-router-dom";
import Loader from "../components/General/loader";
import { useEffect } from "react";

export default function SignUp() {
  const { mutate, isPending } = useSendAuthData("/chat-app/auth/sign-up/");
  useEffect(() => {
    document.title = "Sign Up";

    return () => {};
  }, []);

  return (
    <Auth
      title="Sign Up"
      action={`${BACKEND_ORIGIN}/chat-app/auth/sign-up/`}
      sendAuthData={(data) => {
        if (!data.email?.trim()) delete data["email"];
        mutate(data);
      }}
      withEmailField={true}
    >
      <button type="submit">
        {isPending ? <Loader height={20} width={20} /> : "Submit"}
      </button>

      <Link to="/log-in/" className="switch-auth-cards center">
        J'ai déjà un compte
      </Link>
    </Auth>
  );
}
