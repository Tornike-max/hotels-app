import { Spinner } from "@nextui-org/react";
import { useGetCabins } from "../../queryHooks/useGetCabins";
import Cabin from "./Cabin";

const CabinsContent = () => {
  const { cabinsData, isPending } = useGetCabins();

  if (isPending)
    return (
      <div className="w-full flex justify-center items-center py-40">
        <Spinner size="lg" />
      </div>
    );
  return (
    <div className="max-w-5xl w-full">
      <table className="table-auto w-full text-white">
        <thead>
          <tr className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
            <th className="px-4 py-2">Cabin Name</th>
            <th className="px-4 py-2">Capacity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Discount</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {cabinsData?.map((cabin) => (
            <Cabin key={cabin.$id} cabin={cabin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CabinsContent;
