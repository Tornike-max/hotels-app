import HomeCharts from "../components/home/HomeCharts";
import HomeHeader from "../components/home/HomeHeader";
import HomeStats from "../components/home/HomeStats";
import LineChart from "../components/home/LineChart";

export default function HomePage() {
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col gap-4 px-4 md:px-8 py-10 pb-28 lg:pb-10">
      <HomeHeader />
      <HomeStats />
      <HomeCharts />
      <LineChart />
    </div>
  );
}
