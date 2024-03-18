import StayDurationPieChart from "./StayDurationPieChart";
import TodayActivity from "./TodayActivity";

const HomeCharts = () => {
  return (
    <div className="w-full flex items-center flex-col justify-between  lg:flex-row gap-2 sm:gap-4 bg-black rounded-md py-3 px-4">
      <div className="max-w-2xl w-full flex flex-col justify-center items-center py-4 px-2 rounded-lg shadow-xl border-1 border-slate-800 gap-4 bg-gray-950 overflow-y-auto">
        <h1 className="text-white text-xl sm:text-2xl font-semibold">Today</h1>
        <div className="text-white w-full h-[280px]">
          <TodayActivity />
        </div>
      </div>
      <div className="max-w-2xl w-full flex flex-col justify-center items-center py-4 px-2 rounded-lg shadow-xl border-1 border-slate-800 gap-4 bg-gray-950 overflow-y-auto">
        <h1 className="text-white text-xl sm:text-2xl font-semibold">
          Stay duration summary
        </h1>
        <div className="text-white w-full h-[280px]">
          <StayDurationPieChart />
        </div>
      </div>
    </div>
  );
};

export default HomeCharts;
