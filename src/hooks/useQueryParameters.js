import { useLocation } from "react-router";
import { useMemo } from "react";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export default useQuery;
