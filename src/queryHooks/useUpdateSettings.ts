import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../api/settings/settingsApi";
import toast from "react-hot-toast";
import { SettingsType } from "../types/types";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending: isSettingsUpdating } = useMutation(
    {
      mutationFn: ({
        documentId,
        settingData,
      }: {
        documentId: string;
        settingData: SettingsType;
      }) => updateSettingsApi(documentId, settingData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settings"] });
        toast.success("Settings Updated Successfully");
      },
    }
  );

  return { updateSettings, isSettingsUpdating };
};

export default useUpdateSettings;
