import { useEffect } from "react";

const useDocumentTitle = (value) => {
  useEffect(() => {
    document.title = value;

    return () => {
      document.title = null;
    };
  }, [value]);
};

export default useDocumentTitle;
