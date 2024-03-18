import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import useGetCabinIds from "../queryHooks/useGetCabinIds";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetUserContext } from "../context/useGetUserContext";
import { useGetSettings } from "../queryHooks/useGetSettings";
import { useCreateBooking } from "../queryHooks/useCreateBooking";
import { useNavigate } from "react-router-dom";

type BookingCreateType = {
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: string;
  isPain: string;
  observations: string;
  cabin: string;
  user: string;
};

const BookingCreateFormPage = () => {
  const navigate = useNavigate();
  const { cabinIds, isCabinIdsPending } = useGetCabinIds();
  const { settingsData, isSettingsPending } = useGetSettings();
  const { userFromDB } = useGetUserContext();
  const { createBooking, isBookingCreating } = useCreateBooking();
  const { register, handleSubmit } = useForm<BookingCreateType>();

  if (isCabinIdsPending || isSettingsPending)
    return (
      <div className="w-full flex justify-center items-center py-20 md:py-40">
        <Spinner size="lg" />
      </div>
    );

  const onSubmit: SubmitHandler<BookingCreateType> = (data) => {
    const totalPrice =
      data.hasBreakfast === "yes"
        ? cabinIds?.filter((ids) => ids.$id === data.cabin)[0].regularPrice +
          settingsData?.breakfastPrice
        : cabinIds?.filter((ids) => ids.$id === data.cabin)[0].regularPrice;

    console.log(totalPrice);
    const newBooking = {
      ...data,
      hasBreakfast: data?.hasBreakfast === "yes" ? true : false,
      isPain: data?.isPain === "yes" ? true : false,
      user: userFromDB && userFromDB[0].$id,
      status: "unconfirmed",
      extrasPrice:
        data.hasBreakfast === "yes" ? settingsData?.breakfastPrice : 0,
      cabinPrice: cabinIds?.filter((ids) => ids.$id === data.cabin)[0]
        .regularPrice,
      totalPrice: totalPrice,
      numGuests: Number(data.numGuests),
      numNights: Number(data.numNights),
      observations: data.observations,
    };
    createBooking(newBooking, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  console.log(cabinIds);
  return (
    <div className="max-w-[2200px] w-full h-full flex flex-col justify-center items-center gap-8 py-6 sm:py-10 pb-16 sm:pb-0">
      <h1 className="text-xl sm:text-2xl text-white font-semibold">
        Create New Booking
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl w-full flex flex-col justify-center items-center gap-4 py-4 px-6 bg-black rounded-md"
      >
        <div className="w-full flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-2">
          {cabinIds && (
            <Select
              label="Cabin"
              placeholder="Select Cabin"
              variant="faded"
              color="default"
              className="w-full"
              {...register("cabin", {
                required: "This field is required",
              })}
            >
              {cabinIds.map((cabin) => (
                <SelectItem key={cabin.$id} value={cabin.$id}>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-10 h-10 rounded-md"
                      src={cabin.imageUrl}
                    />
                    <p> Cabin #{cabin.name}</p>
                  </div>
                </SelectItem>
              ))}
            </Select>
          )}
          <Input
            label="Observations"
            placeholder="Enter your observations"
            variant="faded"
            color="default"
            {...register("observations", {
              required: "This field is required",
            })}
          />
        </div>

        <div className="w-full flex justify-between items-center  flex-col sm:flex-row gap-4 sm:gap-2">
          <Select
            label="Do you want to pay?"
            variant="faded"
            color="default"
            className="w-full"
            {...register("isPain", {
              required: "This field is required",
            })}
          >
            <SelectItem key="yes">Yes</SelectItem>
            <SelectItem key="no">No</SelectItem>
          </Select>

          <Select
            label="Do you want breakfast?"
            variant="faded"
            color="default"
            className="w-full"
            {...register("hasBreakfast", {
              required: "This field is required",
            })}
          >
            <SelectItem key="yes">Yes</SelectItem>
            <SelectItem key="no">No</SelectItem>
          </Select>
        </div>

        <div className="w-full flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-2">
          <Input
            label="Number of nights"
            placeholder="Enter Number Of nights"
            type="number"
            variant="faded"
            color="default"
            {...register("numNights", {
              required: "This field is required",
            })}
          />
          <Input
            label="Number of guests"
            placeholder="Enter Number Of Guests"
            type="number"
            variant="faded"
            color="default"
            {...register("numGuests", {
              required: "This field is required",
            })}
          />
        </div>

        <div className="w-full flex justify-end items-center gap-2 py-4">
          <Button type="button" color="danger" variant="flat">
            Close
          </Button>
          <Button type="submit" color="primary" disabled={isBookingCreating}>
            {isBookingCreating ? <Spinner size="sm" /> : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingCreateFormPage;
