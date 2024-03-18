import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../api/bookingData/bookingsData";

export const useGetBookingById = (bookingId: string) => {
  const {
    data: bookingData,
    isPending: isBookingPending,
    error,
  } = useQuery({
    queryKey: ["bookings", `boookingId-${bookingId}`],
    queryFn: () => getBookingById(bookingId),
  });

  if (error) throw new Error("Error");

  return { bookingData, isBookingPending };
};
