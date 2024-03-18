import { Spinner } from "@nextui-org/react";
import SettingsForm from "../components/settings/SettingsForm";
import SettingsHeader from "../components/settings/SettingsHeader";
import { useGetSettings } from "../queryHooks/useGetSettings";

const SettingsPage = () => {
  const { settingsData, isSettingsPending } = useGetSettings();

  if (isSettingsPending)
    return (
      <div className="max-w-[2200px] w-full flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col gap-4 sm:gap-8 pt-10">
      <SettingsHeader />
      <SettingsForm settingsData={settingsData} />
    </div>
  );
};

export default SettingsPage;
