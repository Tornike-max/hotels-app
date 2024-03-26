import { Models } from "appwrite";
import { formatDate } from "../../ui/formatDate";
import { formatCurrency } from "../../ui/formatCurrency";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
  Chip,
} from "@nextui-org/react";
import {
  HiOutlineBars3,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

import { BsBoxArrowInUp } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "../../queryHooks/useDeleteBooking";
import { useChangeStatus } from "../../queryHooks/useChangeStatus";
import toast from "react-hot-toast";
import { useGetUserContext } from "../../context/useGetUserContext";

const Booking = ({ booking }: { booking: Models.Document }) => {
  const { deleteBookingMutation, isDeleting } = useDeleteBooking();
  const { changeStatus, isChanging } = useChangeStatus();
  const navigate = useNavigate();
  const { isAuthenticated } = useGetUserContext();

  const handleCheckin = (value: string) => {
    if (isAuthenticated) {
      if (value === "checked-in" && !booking?.isPain) {
        navigate(`/booking/details/${booking.$id}`);
        toast.error("Please Pay Your Bill");
        return;
      }
      changeStatus({ documentId: booking.$id, value: value });
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <tr className="text-xs sm:text-sm md:text-base text-center">
        <td
          className="border hidden px-4 py-8 md:py-6  sm:flex gap-2 items-center"
          font-semibold
          sm:font-normal
        >
          #{booking?.cabin?.name}
        </td>
        <td className="border px-4 py-2 font-semibold sm:font-normal text-sm">
          <p>{booking?.user?.name}</p>
          <p>{booking?.user?.email}</p>
        </td>
        <td className="border px-4 py-2 font-semibold sm:font-normal text-sm">
          {formatDate(booking?.$createdAt)}
        </td>
        <td className={`border px-4 py-2 font-semibold sm:font-normal`}>
          <Chip
            className={`py-1 px-2 text-center capitalize text-sm rounded-lg ${
              booking?.status === "checked-in"
                ? "bg-green-500 text-white"
                : booking?.status === "checked-out"
                ? "bg-rose-600 text-white"
                : "bg-primary-500 text-white"
            }`}
          >
            {booking?.status}
          </Chip>
        </td>
        <td className="border px-4 py-2 font-semibold sm:font-normal ">
          {formatCurrency(booking?.cabin?.regularPrice)}
        </td>
        <td className="border px-4 py-2 font-semibold sm:font-normal ">
          <Popover placement="left-start" color="foreground">
            <PopoverTrigger>
              <button className="capitalize border-1 border-black rounded-md p-1 hover:border-white ">
                <HiOutlineBars3 className="cursor-pointer text-white" />
              </button>
            </PopoverTrigger>

            <PopoverContent>
              <div className="px-2 py-2 flex flex-col justify-center items-center gap-2">
                <button
                  onClick={() => navigate(`/booking/details/${booking?.$id}`)}
                  className=" font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
                >
                  <HiOutlineEye className="text-lg" />
                  <span>See details</span>
                </button>

                {booking.status === "unconfirmed" && (
                  <button
                    onClick={() => handleCheckin("unconfirmed")}
                    className=" font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
                  >
                    {isChanging ? (
                      <Spinner size="sm" />
                    ) : (
                      <>
                        <HiOutlineCheckBadge className="text-lg" />
                        <span>Check in</span>
                      </>
                    )}
                  </button>
                )}

                {booking.status === "checked-in" && (
                  <button
                    onClick={() => handleCheckin("checked-in")}
                    className=" font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
                  >
                    {isChanging ? (
                      <Spinner size="sm" />
                    ) : (
                      <>
                        <BsBoxArrowInUp className="text-lg" />
                        <span>Check out</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() =>
                    isAuthenticated
                      ? deleteBookingMutation(booking.$id)
                      : navigate("/auth")
                  }
                  className="text-small font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
                >
                  {isDeleting ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <HiOutlineTrash className="text-lg" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </td>
      </tr>
    </>
  );
};

export default Booking;
