import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword } from "../api/data";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Successfully update");
    },
    onError: () => {
      toast.error("error while updating");
    },
  });

  return { mutate, isPending };
};
