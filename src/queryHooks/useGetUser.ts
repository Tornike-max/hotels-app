import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/data";

export const useGetUser = () => {
  const {
    data: userData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  if (error) throw new Error("error while getting data");

  return { userData, isPending };
};
