import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserInfo } from "../api/data";
import toast from "react-hot-toast";

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const { mutate: updateInfo, isPending } = useMutation({
    mutationFn: ({
      email,
      password,
      phone,
      location,
      documentId,
    }: {
      email?: string;
      password: string;
      phone?: string;
      location?: string;
      documentId: string;
    }) => changeUserInfo({ email, password, phone, location, documentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User Successfully updating");
    },
    onError: () => {
      toast.error("Error while updating");
    },
  });

  return { updateInfo, isPending };
};
