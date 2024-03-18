import { Button, Spinner } from "@nextui-org/react";
import { useGetBookings } from "../../queryHooks/useGetBookings";
import Booking from "./Booking";
import { useNavigate } from "react-router-dom";

const BookingsContent = () => {
  const { bookingsData, isPending } = useGetBookings();
  const navigate = useNavigate();
  if (isPending)
    return (
      <div className="w-full flex justify-center items-center py-20 md:py-40">
        <Spinner size={"lg"} />
      </div>
    );

  console.log(bookingsData);

  return (
    <div className="max-w-5xl w-full h-full px-4 overflow-y-auto ">
      <table className="table-auto w-full text-white ">
        <thead className="border-1 border-white ">
          <tr className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-black">
            <th className="px-4 py-2 hidden sm:flex">CABIN</th>
            <th className="px-4 py-2">GUEST</th>
            <th className="px-4 py-2">DATE</th>
            <th className="px-4 py-2">STATUS</th>
            <th className="px-4 py-2">AMOUNT</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {bookingsData?.map((booking) => (
            <Booking key={booking.$id} booking={booking} />
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end items-center py-4">
        <Button
          onClick={() => navigate("/bookings/create")}
          variant="shadow"
          color="primary"
        >
          Create new booking
        </Button>
      </div>
    </div>
  );
};

export default BookingsContent;
