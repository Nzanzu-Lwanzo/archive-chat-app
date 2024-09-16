import Axios from "axios";
import { useState } from "react";
import { BACKEND_ORIGIN } from "../utils/constants";

export default function useFilterAndSearch({ link, filter, handleResult }) {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState([]);

  return {
    getInput: (e) => {
      // The user should provide a function
      // that filters a data.
      // We can't filter inside of this hook because data to filter
      // might be in a state.
      filter(e.target.value);

      // We will need it we don't find it in the state
      // and need to request to the backend
      setSearchInput(e.target.value);
    },

    search: () => {
      setIsSearching(true);
      Axios.get(`${BACKEND_ORIGIN}${link}search/?hint=${searchInput}`, {
        withCredentials: true,
      })
        .then((r) => {
          setResult(r.data);
          handleResult(r.data);
        })
        .catch((e) => {
          console.log(e);
          setResult([]);
        })
        .finally(($) => setIsSearching(false));
    },

    result,
    isSearching,
  };
}
