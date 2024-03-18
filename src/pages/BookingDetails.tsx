import { useParams } from "react-router-dom";
import BookingDetailsContent from "../components/bookings/BookingDetailsContent";
import BookingDetailsHeader from "../components/bookings/BookingDetailsHeader";
import { useGetBookingById } from "../queryHooks/useGetBookingById";
import { Spinner } from "@nextui-org/react";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const { bookingData, isBookingPending } = useGetBookingById(bookingId || "");

  if (isBookingPending)
    return (
      <div className="w-full flex justify-center items-center py-20 md:py-40">
        <Spinner size="lg" />
      </div>
    );
  console.log(bookingData);
  return (
    <div className="max-w-[2200px] w-full h-screen flex justify-start items-center flex-col gap-8 px-8 py-12">
      <BookingDetailsHeader booking={bookingData} />
      <BookingDetailsContent booking={bookingData} />
    </div>
  );
};

export default BookingDetails;
