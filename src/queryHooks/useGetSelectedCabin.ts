import { useQuery } from "@tanstack/react-query";
import { getSelectedCabin } from "../api/cabinsData/cabins";

export const useGetSelectedCabin = (documentId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["cabins", `document-${documentId}`],
    queryFn: () => getSelectedCabin(documentId),
  });

  return { data, isPending };
};
