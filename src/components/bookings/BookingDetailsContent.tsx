import { HiOutlineCurrencyDollar, HiOutlineHomeModern } from "react-icons/hi2";
import { formatCurrency } from "../../ui/formatCurrency";
import { Button } from "@nextui-org/button";
import { Models } from "appwrite";
import { formatDateRange } from "../../ui/formatDateRange";
import { formatDate } from "../../ui/formatDate";
import { useNavigate } from "react-router-dom";
import { Checkbox, Spinner, useDisclosure } from "@nextui-org/react";
import DeleteConfirmation from "../../ui/DeleteConfirmation";
import { useChangeStatus } from "../../queryHooks/useChangeStatus";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetSettings } from "../../queryHooks/useGetSettings";
import { useGetUserContext } from "../../context/useGetUserContext";

const BookingDetailsContent = ({
  booking,
}: {
  booking: Models.Document | undefined;
}) => {
  const { isAuthenticated } = useGetUserContext();
  const [isPaid, setIsPaid] = useState(booking?.isPain);
  const [hasBreakfast, setHasBreakfast] = useState(booking?.hasBreakfast);

  const navigate = useNavigate();
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();
  const { changeStatus, isChanging } = useChangeStatus();
  const { settingsData, isSettingsPending } = useGetSettings();

  const handleChangeStatus = (value: string) => {
    if (!isPaid) {
      toast.error("Please pay your bill");
      return;
    }
    changeStatus({
      documentId: booking?.$id || "",
      value: value,
      isPaid,
      hasBreakfast,
    });
  };

  if (isSettingsPending)
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );

  const singleUserBill =
    booking?.cabin?.regularPrice * booking?.numNights +
    settingsData?.breakfastPrice * booking?.numNights;

  const allUserCabinBill =
    booking?.cabin?.regularPrice * booking?.numNights * booking?.numGuests;

  const breakFastBill =
    booking?.numNights * settingsData?.breakfastPrice * booking?.numGuests;

  const allUsersBill = singleUserBill * booking?.numGuests;

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center flex-col gap-4 rounded-lg bg-gray-800">
        <div
          className={`w-full flex justify-between items-center ${
            booking?.status === "checked-in"
              ? "bg-green-500"
              : booking?.status === "unconfirmed"
              ? "bg-primary-500"
              : "bg-rose-600"
          } py-4 px-6 rounded-t-lg`}
        >
          <div className="flex items-center gap-3 text-white font-semibold">
            <HiOutlineHomeModern className="text-xl md:text-2xl" />
            <span className="text-base md:text-lg xl:text-xl">
              {booking?.numNights} nights in Cabin {booking?.cabin?.name || ""}
            </span>
          </div>
          <p className="text-white font-semibold text-base md:text-lg xl:text-xl">
            {formatDateRange(booking?.$createdAt || "", booking?.numNights)}
          </p>
        </div>
        <div className="w-full flex justify-center items-start gap-4 flex-col px-6">
          <span className="text-white font-semibold text-base md:text-lg xl:text-xl">
            1 Night Price - {formatCurrency(booking?.cabin?.regularPrice)}
          </span>
          <span className="text-white font-semibold text-base md:text-lg xl:text-xl">
            Breakfast price per day -
            {formatCurrency(settingsData?.breakfastPrice)}
          </span>
        </div>
        <div className="w-full flex justify-start items-center gap-4 pb-2 px-6">
          <span className="text-white font-semibold text-base md:text-lg xl:text-xl">
            {booking?.user?.name} + {booking?.numGuests} guests
          </span>
          <span className="text-slate-400 text-xl font-semibold">.</span>
          <span className="text-slate-300 font-semibold text-base md:text-lg xl:text-xl">
            {booking?.user?.email}
          </span>
        </div>
        <div className="w-full flex justify-start items-center gap-4 pb-2 px-6 text-white font-semibold text-base md:text-lg xl:text-xl">
          <span>Breakfast included?</span>
          {"  "}
          <span>{booking?.hasBreakfast ? "Yes" : "No"}</span>
        </div>
        <div
          className={`max-w-3xl w-full flex justify-between items-center gap-4 my-2 mx-8 py-6 px-6 rounded-lg ${
            booking?.status === "checked-in"
              ? "bg-green-500"
              : booking?.status === "unconfirmed"
              ? "bg-primary-500"
              : "bg-rose-600"
          } `}
        >
          <div className="flex items-center gap-2 text-white  font-semibold">
            <HiOutlineCurrencyDollar className="text-xl md:text-2xl" />
            <span className="text-base md:text-lg xl:text-xl ">
              Total price
            </span>
            <span className="text-slate-200 text-xl font-semibold px-2">.</span>
            <span className=" text-base md:text-lg ">
              {formatCurrency(allUsersBill)}
            </span>
            <span>
              ({formatCurrency(allUserCabinBill)} Cabin +{" "}
              {hasBreakfast
                ? formatCurrency(breakFastBill)
                : formatCurrency(booking?.extrasPrice)}{" "}
              breakfast)
            </span>
          </div>
          <span className="font-semibold text-white text-base md:text-lg xl:text-xl uppercase">
            {booking?.isPain ? "Paid" : "Not paid"}
          </span>
        </div>

        {!booking?.isPain && (
          <>
            <div className="w-full flex items-center gap-2 pb-2 px-8 text-white">
              <Checkbox isSelected={isPaid} onValueChange={setIsPaid} />
              <p>
                {isPaid
                  ? "Do you want to cancel a payment?"
                  : "Do you want to pay?"}
              </p>
            </div>
            <div className="w-full flex items-center gap-2 pb-4 px-8 text-white">
              <Checkbox
                isSelected={hasBreakfast}
                onValueChange={setHasBreakfast}
              />
              <p>
                {hasBreakfast
                  ? "Would you like to cancel breakfast?"
                  : "do you want breakfast?"}
              </p>
            </div>
          </>
        )}

        <div className="w-full flex justify-end items-center pb-4 px-8">
          <p className="text-slate-200 font-medium text-sm md:text-medium">
            {formatDate(booking?.$createdAt || "")}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-2 pt-4 pb-28 lg:pb-0">
        <Button onClick={() => navigate(-1)} variant="shadow" color="default">
          Back
        </Button>
        <Button
          onClick={isAuthenticated ? onOpen : () => navigate("/auth")}
          variant="shadow"
          color="danger"
        >
          Delete
        </Button>
        {booking?.status !== "checked-out" && (
          <Button
            onClick={() =>
              isAuthenticated
                ? handleChangeStatus(
                    `${
                      booking?.status === "checked-in"
                        ? "checked-in"
                        : booking?.status === "unconfirmed"
                        ? "unconfirmed"
                        : ""
                    }`
                  )
                : navigate("/auth")
            }
            variant="shadow"
            color="primary"
          >
            {isChanging ? (
              <Spinner size="sm" color="default" />
            ) : booking?.status === "checked-in" ? (
              "Check out"
            ) : booking?.status === "unconfirmed" ? (
              "Check in"
            ) : (
              ""
            )}
          </Button>
        )}
      </div>
      {isOpen && (
        <DeleteConfirmation
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          documentId={booking?.$id || ""}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default BookingDetailsContent;
