import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/settings/settingsApi";

export const useGetSettings = () => {
  const {
    data: settingsData,
    isPending: isSettingsPending,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (error) throw new Error("Error while getting data");

  return { settingsData, isSettingsPending };
};
