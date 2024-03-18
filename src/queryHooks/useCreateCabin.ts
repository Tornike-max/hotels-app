import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin } from "../api/cabinsData/cabins";
import { CabinCreateType } from "../types/types";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (newData: CabinCreateType) => createNewCabin(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin Created Successfully");
    },
    onError: () => {
      toast.error("Error while creating cabin");
    },
  });

  return { createCabin, isCreating };
};
