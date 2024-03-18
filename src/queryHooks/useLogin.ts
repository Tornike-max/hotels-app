import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "../api/data";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: loginUser, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      userLogin(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User Successfully login");
      navigate("/");
    },
    onError: () => {
      toast.error("error while login");
    },
  });

  return { loginUser, isPending };
};
