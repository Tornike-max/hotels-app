import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { formatCurrency } from "../../ui/formatCurrency";
import { useGetBookingsDependOnDays } from "../../queryHooks/useGetBookingsDependOnDays";
import { useGetSettings } from "../../queryHooks/useGetSettings";
import HomeStatsSkelleton from "./HomeStatsSkelleton";

const HomeStats = () => {
  const { data, isPending } = useGetBookingsDependOnDays();
  const { settingsData, isSettingsPending } = useGetSettings();

  if (isPending || isSettingsPending)
    return (
      <div className="w-full grid grid-cols-2 xl:grid-cols-4 bg-black rounded-md py-3 px-4 gap-2 sm:gap-3 md:gap-4">
        <HomeStatsSkelleton />
        <HomeStatsSkelleton />
        <HomeStatsSkelleton />
        <HomeStatsSkelleton />
      </div>
    );

  const totalSales = data?.reduce(
    (accum, cur) =>
      accum +
      cur.cabin.regularPrice * cur?.numNights +
      settingsData?.breakfastPrice * cur?.numNights * cur.numNights,
    0
  );

  const checkIns = data?.filter(
    (booking) => booking.status === "checked-in"
  ).length;

  const occupation = data?.reduce((accum, cur) => accum + cur.numNights, 0);
  const totalAvailableNights = 366;
  const occupancyRate = ((occupation || 0) / totalAvailableNights) * 100;

  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-4 bg-black rounded-md py-3 px-4 gap-2 sm:gap-3 md:gap-4">
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-base sm:text-xl md:text-2xl lg:text-5xl p-3 lg:p-4 bg-indigo-500 rounded-full">
          <HiOutlineBriefcase />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="text-[10px] sm:text-xs md:text-base">Bookings</span>
          <span className="text-[9px] sm:text-base">{data?.length}</span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-base sm:text-xl md:text-2xl lg:text-5xl p-3 lg:p-4 bg-green-700 rounded-full">
          <HiOutlineCurrencyDollar />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="text-[10px] sm:text-xs md:text-base">Sales</span>
          <span className="text-[9px] sm:text-base">
            {formatCurrency(totalSales || 0)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-base sm:text-xl md:text-2xl lg:text-5xl p-3 lg:p-4 bg-indigo-700 rounded-full">
          <HiOutlineCalendarDays />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="text-[10px] sm:text-xs md:text-base">Check ins</span>
          <span className="text-[9px] sm:text-base">{checkIns}</span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-base sm:text-xl md:text-2xl lg:text-5xl p-3 lg:p-4 bg-orange-800 rounded-full">
          <HiOutlineChartBar />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="text-[10px] sm:text-xs md:text-base">
            Occupancy rate
          </span>
          <span className="text-[9px] sm:text-base">
            {occupancyRate.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeStats;
