import { Chip } from "@nextui-org/react";
import { Models } from "appwrite";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const BookingDetailsHeader = ({
  booking,
}: {
  booking: Models.Document | undefined;
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center ">
      <div className="flex items-center gap-2">
        <p className="text-white font-bold text-2xl">
          Booking #{booking?.$id.slice(0, 3)}
        </p>
        <Chip
          variant="shadow"
          color={`${
            booking?.status === "checked-in"
              ? "success"
              : booking?.status === "unconfirmed"
              ? "primary"
              : "danger"
          }`}
        >
          {booking?.status}
        </Chip>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="text-white font-semibold flex items-center gap-1 py-1 px-2 border-1 border-black hover:border-white rounded-lg duration-150 transition-all"
      >
        <HiOutlineArrowLeft />
        <span>Back</span>
      </button>
    </div>
  );
};

export default BookingDetailsHeader;
