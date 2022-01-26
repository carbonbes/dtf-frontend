import { useState, useEffect } from "react";

const useScrollBlocked = (props) => {
  const [isScrollBlocked, setIsScrollBlocked] = useState();

  useEffect(() => {
    if (isScrollBlocked && !props.isMobile) {
      const scrollbarWidth = window.innerWidth - document.body.offsetWidth;

      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    if (isScrollBlocked && props.isMobile) {
      document.body.style.touchAction = "none";
    }

    if (!isScrollBlocked) {
      document.body.style.overflowY = "";
      document.body.style.touchAction = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflowY = "";
      document.body.style.touchAction = "";
      document.body.style.paddingRight = "";
    };
  }, [isScrollBlocked, props.isMobile]);

  return { isScrollBlocked, setIsScrollBlocked };
};

export default useScrollBlocked;
