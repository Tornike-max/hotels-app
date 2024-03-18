const HomeStatsSkelleton = () => (
  <div className="flex items-center justify-start gap-2 sm:gap-4 px-2 py-4 bg-gray-950 text-white rounded-lg shadow-xl border-1 border-slate-800 animate-pulse">
    <div className="text-lg sm:text-2xl md:text-2xl lg:text-5xl p-4 sm:p-6 md:p-8  bg-gray-700 rounded-full"></div>
    <div className="flex flex-col justify-center items-start gap-1">
      <div className="text-[10px] sm:text-xs md:text-base bg-gray-700 h-4 sm:h-6 w-16 rounded"></div>
      <div className="text-[9px] sm:text-base bg-gray-700 h-4 sm:h-5 w-12 rounded"></div>
    </div>
  </div>
);

export default HomeStatsSkelleton;
