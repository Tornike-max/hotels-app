import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { useGetSalesData } from "../../queryHooks/useGetSalesData";
import { Spinner } from "@nextui-org/react";

const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

const StayDurationPieChart = () => {
  const { data: salesData, isPending } = useGetSalesData();

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  const data = salesData?.map((sale) => {
    return {
      duration: sale.numNights,
    };
  });

  console.log(data);

  return (
    <ResponsiveContainer width={730} height={250}>
      <PieChart>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={85}
          outerRadius={110}
          paddingAngle={3}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StayDurationPieChart;
