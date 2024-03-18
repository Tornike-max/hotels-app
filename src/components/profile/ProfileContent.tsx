import ProfileBookingImages from "./ProfileBookingImages";
import { Models } from "appwrite";

export default function ProfileContent({
  userFromDB,
}: {
  userFromDB: Models.Document | undefined;
}) {
  return (
    <div className="w-full flex justify-center items-center flex-col py-8 px-10 mx-10 my-2 rounded-sm border-[1px] border-gray-700">
      <div className="w-full flex justify-center items-center">
        <h1 className="text-xl font-semibold text-white pb-4">
          Bookings History
        </h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {userFromDB &&
          userFromDB.booking.map((booking: Models.Document) => (
            <ProfileBookingImages key={booking.$id} booking={booking} />
          ))}
      </div>
    </div>
  );
}
