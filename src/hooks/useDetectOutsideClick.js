import { useEffect } from "react";

const useDetectOutsideClick = (ref, callback, ignore = null) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target) && !ignore) {
      callback(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};

export default useDetectOutsideClick;
