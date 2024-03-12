import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CabinEditType } from "../types/types";
import { editCabinApi } from "../api/cabinsData/cabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending } = useMutation({
    mutationFn: ({
      documentId,
      updatedData,
    }: {
      documentId: string;
      updatedData: CabinEditType;
    }) => editCabinApi(documentId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Successfully Updated");
    },
    onError: () => {
      toast.error("Error while updating");
    },
  });
  return { updateCabin, isPending };
};
