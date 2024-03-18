import { useTodayActivity } from "../../queryHooks/useTodayActivity";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import TodayActivitySkeleton from "./TodayActivitySkeleton";

const TodayActivity = () => {
  const navigate = useNavigate();
  const { activityData, isPending } = useTodayActivity();

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-start gap-2 py-2 w-full">
        <TodayActivitySkeleton />
        <TodayActivitySkeleton />
        <TodayActivitySkeleton />
        <TodayActivitySkeleton />
        <TodayActivitySkeleton />
      </div>
    );
  }

  const checkedData = activityData?.filter(
    (item) => item.status !== "checked-out"
  );

  console.log(checkedData);
  return (
    <div className="flex flex-col justify-center items-start gap-2 overflow-y-auto py-2 w-full">
      {activityData?.map((activity: Models.Document) => (
        <div
          key={activity.$id}
          className="flex justify-between items-center w-full py-1 px-2 rounded-md gap-4"
        >
          <span
            className={`${
              activity.status === "unconfirmed" ? "bg-green-500" : "bg-blue-500"
            } bg-opacity-50 text-white font-semibold text-sm sm:text-base rounded-lg py-1 px-1 sm:px-2`}
          >
            {activity.status === "unconfirmed" ? "Arriving" : "Departing"}
          </span>
          <span className="hidden sm:block text-sm sm:text-base">
            Customer: {activity.user.name}
          </span>
          <span className="lg:hidden 2xl:block text-sm sm:text-base">
            {activity.numNights} Nights
          </span>
          <button
            onClick={() => navigate(`/booking/details/${activity.$id}`)}
            className={`py-1 px-2 sm:py-2 sm:px-3 rounded-lg border-1 ${
              activity.status === "unconfirmed"
                ? "border-green-500 hover:bg-green-500"
                : "border-blue-500 hover:bg-blue-500"
            }  bg-opacity-50 text-sm sm:text-base`}
          >
            {activity.status === "checked-in" ? "Check out" : "Check in"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodayActivity;
