import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const HomeStats = () => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 bg-black rounded-md py-3 px-4 gap-2 sm:gap-3 md:gap-4">
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-5xl p-4 bg-indigo-500 rounded-full">
          <HiOutlineBriefcase />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span>Bookings</span>
          <span>0</span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-5xl p-4 bg-green-700 rounded-full">
          <HiOutlineCurrencyDollar />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span>Bookings</span>
          <span>0</span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-5xl p-4 bg-indigo-700 rounded-full">
          <HiOutlineCalendarDays />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span>Bookings</span>
          <span>0</span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-2 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-5xl p-4 bg-orange-800 rounded-full">
          <HiOutlineChartBar />
        </span>
        <div className="flex flex-col justify-center items-start gap-1">
          <span>Bookings</span>
          <span>0</span>
        </div>
      </div>{" "}
    </div>
  );
};

export default HomeStats;
