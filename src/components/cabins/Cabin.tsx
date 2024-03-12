import { Models } from "appwrite";
import {
  HiOutlineBars3,
  HiOutlineDocumentDuplicate,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { MdOutlineHorizontalRule } from "react-icons/md";

import { formatCurrency } from "../../ui/formatCurrency";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useDuplicateCabin } from "../../queryHooks/useDuplicateCabin";
import { useDeleteCabin } from "../../queryHooks/useDeleteCabin";
import EditCabinModal from "./EditCabinModal";

const Cabin = ({ cabin }: { cabin: Models.Document }) => {
  const { duplicate, isPending } = useDuplicateCabin();
  const { deleteSelectedCabin, isPending: isDeleting } = useDeleteCabin();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(cabin);

  const handleDuplicate = () => {
    if (!cabin) return;
    const duplicatedData = {
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      description: cabin.description,
      imageUrl: cabin.imageUrl,
      hush: cabin.hush,
    };
    duplicate(duplicatedData);
    console.log("click");
  };

  const handleDelete = (documentId: string) => {
    if (!documentId) return;

    deleteSelectedCabin(documentId);
  };
  return (
    <>
      <tr key={cabin.$id}>
        <td className="border px-4 py-2 flex gap-2 items-center">
          <img src={cabin.imageUrl} className="w-20 h-16" />
          {cabin.name}
        </td>
        <td className="border px-4 py-2">
          Fits up to {cabin.maxCapacity} guests
        </td>
        <td className="border px-4 py-2">
          {formatCurrency(cabin.regularPrice)}
        </td>
        <td className="border px-4 py-2">
          {cabin.discount === 0 ? (
            <MdOutlineHorizontalRule />
          ) : (
            formatCurrency(cabin.discount)
          )}
        </td>
        <td className="border  px-4 py-2 ">
          <Popover placement="left-start" color="foreground">
            <PopoverTrigger>
              <button className="capitalize">
                <HiOutlineBars3 className="cursor-pointer text-white" />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-2 py-2 flex flex-col justify-center items-center gap-2">
                <button
                  onClick={handleDuplicate}
                  className="text-small font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
                >
                  {isPending ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <HiOutlineDocumentDuplicate className="text-lg" />
                      <span>Duplicate</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onOpen}
                  className="text-small font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
                >
                  <HiOutlinePencil className="text-lg" />
                  <span>Edit</span>
                </button>
                {isOpen && (
                  <EditCabinModal
                    onOpenChange={onOpenChange}
                    isOpen={isOpen}
                    documentId={cabin.$id}
                  />
                )}
                <button
                  onClick={() => handleDelete(cabin.$id)}
                  className="text-small font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
                >
                  {isDeleting ? (
                    "Delete"
                  ) : (
                    <>
                      <HiOutlineTrash className="text-lg" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </td>
      </tr>
    </>
  );
};

export default Cabin;
