import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../api/data";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User Successfully logout");
    },
    onError: () => {
      toast.error("Can't Sign out");
    },
  });

  return { logout, isPending };
};
