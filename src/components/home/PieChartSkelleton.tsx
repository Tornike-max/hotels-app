const PieChartSkelleton = () => {
  return (
    <div className="w-full flex items-center justify-center animate-pulse">
      <div className="w-[200px] h-[200px] bg-gray-700 rounded-full overflow-hidden animate-pulse">
        <div className="w-full h-full bg-none rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default PieChartSkelleton;
