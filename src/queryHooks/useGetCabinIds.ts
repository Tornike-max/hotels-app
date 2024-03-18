import { useQuery } from "@tanstack/react-query";
import { getCabinsIds } from "../api/cabinsData/cabins";

const useGetCabinIds = () => {
  const {
    data: cabinIds,
    isPending: isCabinIdsPending,
    error,
  } = useQuery({
    queryKey: ["cabinIds"],
    queryFn: getCabinsIds,
  });

  if (error) throw Error("Error while getting ids");

  return { cabinIds, isCabinIdsPending };
};

export default useGetCabinIds;
