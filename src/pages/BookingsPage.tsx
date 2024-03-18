import BookingsContent from "../components/bookings/BookingsContent";
import BookingsHeader from "../components/bookings/BookingsHeader";

const BookingsPage = () => {
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col gap-4 pb-20">
      <BookingsHeader />
      <BookingsContent />
    </div>
  );
};

export default BookingsPage;
