import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../api/bookingData/bookingsData";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBookingMutation, isPending: isDeleting } = useMutation({
    mutationFn: (documentId: string) => deleteBooking(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
      queryClient.invalidateQueries({ queryKey: ["sales"] });

      toast.success("Booking deleted successfully");
    },
    onError: () => {
      toast.error("Can't delete booking");
    },
  });

  return { deleteBookingMutation, isDeleting };
};
