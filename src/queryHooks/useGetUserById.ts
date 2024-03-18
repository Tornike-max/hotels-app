import { useQuery } from "@tanstack/react-query";
import { getUserProfileById } from "../api/profileData/profile";

export const useGetUserById = (userId: string) => {
  const {
    data: userData,
    isPending: isUserPending,
    error,
  } = useQuery({
    queryKey: ["user", `userId-${userId}`],
    queryFn: () => getUserProfileById(userId),
  });

  if (error) throw new Error("Error while getting user");

  return { userData, isUserPending };
};
