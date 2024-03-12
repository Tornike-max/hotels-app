import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin } from "../api/cabinsData/cabins";
import toast from "react-hot-toast";
import { CabinType } from "../types/types";

export const useDuplicateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: duplicate, isPending } = useMutation({
    mutationFn: (duplicateData: CabinType) => duplicateCabin(duplicateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin duplicated successfully");
    },
    onError: () => {
      toast.error("Error while duplicating");
    },
  });
  return { duplicate, isPending };
};
