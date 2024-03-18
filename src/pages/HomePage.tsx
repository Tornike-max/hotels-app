import HomeCharts from "../components/home/HomeCharts";
import HomeHeader from "../components/home/HomeHeader";
import HomeStats from "../components/home/HomeStats";
import LineChart from "../components/home/LineChart";

export default function HomePage() {
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col gap-4 px-10 py-10">
      <HomeHeader />
      <HomeStats />
      <HomeCharts />
      <LineChart />
    </div>
  );
}
