import { useQuery } from "@tanstack/react-query";
import { getBookingsForStat } from "../api/bookingData/bookingsData";
import { useSearchParams } from "react-router-dom";

export const useGetBookingsDependOnDays = () => {
  const [searchParams] = useSearchParams();
  const last = searchParams.get("last");
  const { data, isPending } = useQuery({
    queryKey: ["bookings", `last-${last} days`],
    queryFn: () => getBookingsForStat(last || ""),
  });
  return { data, isPending };
};
