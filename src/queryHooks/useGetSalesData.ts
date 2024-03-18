import { useQuery } from "@tanstack/react-query";
import { salesData } from "../api/bookingData/bookingsData";

export const useGetSalesData = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["sales"],
    queryFn: salesData,
  });

  if (error) throw new Error("Error while gettind data");
  return { data, isPending };
};
