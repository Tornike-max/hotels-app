import { Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SettingsType } from "../../types/types";
import { Models } from "appwrite";
import useUpdateSettings from "../../queryHooks/useUpdateSettings";
import { useGetUserContext } from "../../context/useGetUserContext";

const SettingsForm = ({
  settingsData,
}: {
  settingsData: Models.Document | undefined;
}) => {
  const { updateSettings } = useUpdateSettings();
  const { register, handleSubmit } = useForm<SettingsType>();
  const { isAuthenticated } = useGetUserContext();

  const onSubmit: SubmitHandler<SettingsType> = (data) => {
    const settingData = {
      minNights: Number(data.minNights),
      maxNights: Number(data.maxNights),
      maxGuests: Number(data.maxGuests),
      breakfastPrice: Number(data.breakfastPrice),
    };
    updateSettings({
      documentId: settingsData?.$id || "",
      settingData: settingData,
    });
    console.log(settingData);
  };
  return (
    <div className="w-full flex justify-center items-center px-4 ">
      <form
        onBlur={handleSubmit(onSubmit)}
        className="max-w-3xl w-full flex justify-center items-center flex-col gap-4 sm:gap-6 bg-black rounded-md py-10 px-8"
      >
        <div className="w-full flex items-center justify-between flex-col sm:flex-row gap-2">
          <label className="text-base sm:text-lg text-white">
            Minimum nights/booking
          </label>
          <Input
            type="number"
            disabled={!isAuthenticated}
            label="Minimum nights"
            defaultValue={settingsData?.minNights}
            {...register("minNights")}
            className="max-w-xs"
          />
        </div>
        <div className="w-full flex items-center justify-between flex-col sm:flex-row gap-2">
          <label className="text-base sm:text-lg text-white">
            Maximum nights/booking
          </label>
          <Input
            type="number"
            disabled={!isAuthenticated}
            label="Maximum nights"
            defaultValue={settingsData?.maxNights}
            {...register("maxNights")}
            className="max-w-xs"
          />
        </div>
        <div className="w-full flex items-center justify-between flex-col sm:flex-row gap-2">
          <label className="text-base sm:text-lg text-white">
            Maximum guests/booking
          </label>
          <Input
            type="number"
            disabled={!isAuthenticated}
            label="Maximum guests"
            defaultValue={settingsData?.maxGuests}
            {...register("maxGuests")}
            className="max-w-xs"
          />
        </div>
        <div className="w-full flex items-center justify-between flex-col sm:flex-row gap-2">
          <label className="text-base sm:text-lg text-white">
            Breakfast price
          </label>
          <Input
            type="number"
            disabled={!isAuthenticated}
            label="Breakfast price"
            defaultValue={settingsData?.breakfastPrice}
            {...register("breakfastPrice")}
            className="max-w-xs"
          />
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
