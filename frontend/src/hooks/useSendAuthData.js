import Axios from "axios";
import { BACKEND_ORIGIN } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import { lsWrite } from "../utils/localStorage-io";
import { useChatContext } from "../context/ChatContext";
import { fUserImageLink } from "../utils/formatters";

/**
 *
 * @param {string} path
 * @returns
 */
export default function useSendAuthData(path) {
  const { setUser } = useChatContext();

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data) => {
      const r = await Axios.post(`${BACKEND_ORIGIN}${path}`, data, {
        withCredentials: true,
      });

      const image = r.data.image;

      // Store the user in a state
      setUser({ ...r.data, image: fUserImageLink(image) });

      // Store the connected user in localStorage
      lsWrite(["user", { ...r.data, image: fUserImageLink(image) }]);

      return r.data;
    },
  });

  return { mutate, isPending };
}
