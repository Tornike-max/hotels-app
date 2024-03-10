import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSingup } from "../api/data";
import toast from "react-hot-toast";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: signupUser, isPending } = useMutation({
    mutationFn: ({
      fullname,
      email,
      password,
    }: {
      fullname: string;
      email: string;
      password: string;
    }) => userSingup(fullname, email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User Successfully signup");
    },
    onError: () => {
      toast.error("Error while signup");
    },
  });

  return { signupUser, isPending };
};
