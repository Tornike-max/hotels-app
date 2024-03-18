import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useGetSalesData } from "../../queryHooks/useGetSalesData";
import { getRandomColor } from "../../ui/getRandomColor";
import PieChartSkelleton from "./PieChartSkelleton";

const StayDurationPieChart = () => {
  const { data: salesData, isPending } = useGetSalesData("stays");

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PieChartSkelleton />
      </div>
    );

  const data = salesData?.map((sale) => {
    return {
      value: sale.numNights,
      name: sale.cabin.name,
      color: getRandomColor(),
    };
  });

  const tooltipFormatter = (value: string) => {
    return `Cabin ${value} Nights.`;
  };

  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={85}
          outerRadius={110}
          paddingAngle={3}
        >
          {data?.map((item) => (
            <Cell fill={item.color} stroke={item.color} key={item.name} />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFormatter} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StayDurationPieChart;
