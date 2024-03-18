import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookingApi } from "../api/bookingData/bookingsData";
import { BookingCreateType } from "../types/types";
import toast from "react-hot-toast";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isPending: isBookingCreating } = useMutation({
    mutationFn: (newBooking: BookingCreateType) => createBookingApi(newBooking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully");
    },
    onError: () => {
      toast.error("Error while");
    },
  });
  return { createBooking, isBookingCreating };
};
