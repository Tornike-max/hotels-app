import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/bookingData/bookingsData";
import { useSearchParams } from "react-router-dom";

export const useGetBookings = () => {
  const [searchParmas] = useSearchParams();
  const getFiltertVal = searchParmas.get("bookings-filterBy") || "all";
  const getSortedVal = searchParmas.get("bookings-sortBy") || "";
  const page = searchParmas.get("page") || "1";

  const {
    data: bookingsData,
    isPending,
    error,
  } = useQuery({
    queryKey: [
      "bookings",
      `filterBy-${getFiltertVal}`,
      `sortBy-${getSortedVal}`,
      `page-${page}`,
    ],
    queryFn: () => getBookings(getFiltertVal, getSortedVal, page),
  });
  if (error) throw new Error("Error while getting data");
  return { bookingsData, isPending };
};
