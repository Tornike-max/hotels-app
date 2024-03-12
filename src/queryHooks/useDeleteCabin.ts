import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../api/cabinsData/cabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSelectedCabin, isPending } = useMutation({
    mutationFn: (documentId: string) => deleteCabin(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin Successfully deleted");
    },
    onError: () => {
      toast.error("Error while deleting");
    },
  });

  return { deleteSelectedCabin, isPending };
};
