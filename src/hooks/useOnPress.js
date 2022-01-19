import { useEffect } from "react";

const usePress = (toggler) => {
  useEffect(() => {
    document.addEventListener("keydown", handlePressOutside);
    return () => {
      document.removeEventListener("keydown", handlePressOutside);
    };
  });

  const handlePressOutside = ({ key }) => {
    switch (key) {
      case "Escape":
        toggler(false);
        break;
      default:
        break;
    }
  };
};

export default usePress;
