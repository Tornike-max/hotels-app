import { useQuery } from "@tanstack/react-query";
import { todayActivityData } from "../api/bookingData/bookingsData";

export const useTodayActivity = () => {
  const {
    data: activityData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["today-activity"],
    queryFn: todayActivityData,
  });
  if (error) throw new Error("Error while getting data");

  return { activityData, isPending };
};
