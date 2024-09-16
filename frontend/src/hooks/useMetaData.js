import { useEffect, useState } from "react";

export default function useMetaData() {
  const [docTitle, setDocTitle] = useState();

  useEffect(() => {
    // Change the title of the document
    document.title = docTitle;
  }, []);

  return {
    title: (title) => setDocTitle(title),
  };
}
