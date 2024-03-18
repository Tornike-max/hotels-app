import { useQuery } from "@tanstack/react-query";
import { salesData } from "../api/bookingData/bookingsData";

export const useGetSalesData = (reqReason: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["sales", reqReason],
    queryFn: () => salesData(reqReason),
  });

  if (error) throw new Error("Error while gettind data");
  return { data, isPending };
};
