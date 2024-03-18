import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInAndOut } from "../api/bookingData/bookingsData";
import toast from "react-hot-toast";

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: changeStatus, isPending: isChanging } = useMutation({
    mutationFn: ({
      documentId,
      value,
      isPaid,
      hasBreakfast,
    }: {
      documentId: string;
      value: string;
      isPaid?: boolean;
      hasBreakfast?: boolean;
    }) => checkInAndOut(documentId, value, isPaid, hasBreakfast),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Status Changed Successfully");
    },
    onError: () => {
      toast.error("Error While Changing");
    },
  });
  return { changeStatus, isChanging };
};
