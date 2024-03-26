import { useGetCabins } from "../../queryHooks/useGetCabins";
import Cabin from "./Cabin";
import TableSkeleton from "../../ui/TableSkeleton";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import CreateNewCabinModal from "./CreateNewCabinModal";
import { useGetUserContext } from "../../context/useGetUserContext";
import { useNavigate } from "react-router-dom";

const CabinsContent = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useGetUserContext();
  const { cabinsData, isPending } = useGetCabins();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  if (isPending) return <TableSkeleton />;

  return (
    <div className="max-w-5xl w-full h-full mb-10 px-4 overflow-y-auto">
      <table className="table-auto w-full text-white">
        <thead className="border border-white bg-black">
          <tr className="text-sm sm:text-base md:text-lg lg:text-xl font-bold ">
            <th className="px-4 py-2 hidden sm:flex">Cabin Name</th>
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
      <div className="w-full flex items-center justify-center py-4">
        <Button
          variant="shadow"
          color="primary"
          onPress={isAuthenticated ? onOpen : () => navigate("/auth")}
        >
          Create Cabin
        </Button>
        {isOpen && (
          <CreateNewCabinModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default CabinsContent;
