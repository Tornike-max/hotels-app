import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetSalesData } from "../../queryHooks/useGetSalesData";
import { Spinner } from "@nextui-org/react";
import { formatDate } from "../../ui/formatDate";

const LineChart = () => {
  const { data: salesData, isPending } = useGetSalesData();

  if (isPending)
    return (
      <div className="w-full flex justify-center items-center py-20 sm:py-40">
        <Spinner size="lg" />
      </div>
    );

  const data = salesData?.map((sale) => {
    return {
      $createdAt: formatDate(sale.$createdAt),
      totalPrice: sale.totalPrice,
      extrasPrice: sale.extrasPrice,
    };
  });

  console.log(data);

  return (
    <div className="w-full flex justify-center items-center flex-col gap-2 bg-black rounded-md py-3 px-4">
      <h1 className="text-white text-xl sm:text-2xl font-semibold">Sales</h1>
      <ResponsiveContainer width={730} height={250}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="$createdAt" />
          <YAxis />
          <CartesianGrid strokeDasharray="2 2" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalPrice"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="extrasPrice"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
