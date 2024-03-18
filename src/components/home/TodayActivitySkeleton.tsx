const TodayActivitySkeleton = () => {
  return (
    <div className="flex justify-between items-center w-full py-1 px-2 rounded-md gap-4 animate-pulse">
      <div className="w-12 h-10 bg-gray-700 rounded-lg"></div>
      <div className="w-32 h-10 bg-gray-700 rounded-lg hidden sm:block"></div>
      <div className="w-16 h-10 bg-gray-700 rounded-lg hidden lg:block xl:hidden 2xl:block"></div>
      <div className="w-16 h-10 bg-gray-700 rounded-lg"></div>
    </div>
  );
};

export default TodayActivitySkeleton;
