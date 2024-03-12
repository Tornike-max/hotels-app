import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../api/cabinsData/cabins";
import { useSearchParams } from "react-router-dom";

export const useGetCabins = () => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("filter-by") || "";
  const sortValue = searchParams.get("sort-by") || "";
  const {
    data: cabinsData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cabins", `filterBy-${filterValue}`, `sortBy-${sortValue}`],
    queryFn: () => getCabins(filterValue, sortValue),
  });

  if (error) throw new Error("error while getting data");

  return { cabinsData, isPending };
};
