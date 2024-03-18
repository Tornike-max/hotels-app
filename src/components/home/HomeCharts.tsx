import StayDurationPieChart from "./StayDurationPieChart";

const HomeCharts = () => {
  return (
    <div className="w-full flex items-center justify-between gap-2 sm:gap-4 bg-black rounded-md py-3 px-4">
      <div className="max-w-2xl w-full flex flex-col justify-center items-center py-4 px-2 rounded-lg shadow-xl border-1 border-slate-800 gap-4 bg-gray-950">
        <h1 className="text-white text-xl sm:text-2xl font-semibold">Today</h1>
        <div className="text-white">chart</div>
      </div>
      <div className="max-w-2xl w-full flex flex-col justify-center items-center py-4 px-2 rounded-lg shadow-xl border-1 border-slate-800 gap-4 bg-gray-950">
        <h1 className="text-white text-xl sm:text-2xl font-semibold">
          Stay duration summary
        </h1>
        <div className="text-white">
          <StayDurationPieChart />
        </div>
      </div>
    </div>
  );
};

export default HomeCharts;
