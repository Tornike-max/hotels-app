import React, { memo, useEffect, useState } from "react";
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
import { useCallback } from "react";
import { Blurhash } from "react-blurhash";
import { useGetUserContext } from "../../context/useGetUserContext";
import { useNavigate } from "react-router-dom";

const Cabin = memo(({ cabin }: { cabin: Models.Document }) => {
  const { isAuthenticated } = useGetUserContext();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { duplicate, isPending } = useDuplicateCabin();
  const { deleteSelectedCabin, isPending: isDeleting } = useDeleteCabin();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = cabin.imageUrl;
  }, [cabin.imageUrl]);

  const handleDuplicate = useCallback(() => {
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
  }, [cabin, duplicate]);

  const handleDelete = (documentId: string) => {
    if (!documentId) return;
    deleteSelectedCabin(documentId);
  };

  return (
    <>
      <tr className="text-xs sm:text-sm md:text-base">
        <td className="border hidden px-4 py-2 sm:flex gap-2 items-center">
          {!imageLoaded && (
            <Blurhash
              hash={cabin.hush}
              width={80}
              height={64}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          )}
          {imageLoaded && (
            <img src={cabin.imageUrl} className="w-16 h-14 sm:w-20 sm:h-16" />
          )}
          {cabin.name}
        </td>
        <td className="border px-4 py-2">
          Fits up to {cabin.maxCapacity} guests
        </td>
        <td className="border px-4 py-2">
          {formatCurrency(cabin.regularPrice)}
        </td>
        <td className="border px-4 py-2">
          {cabin.discount === 0 || cabin.discount === null ? (
            <MdOutlineHorizontalRule />
          ) : (
            formatCurrency(cabin.discount)
          )}
        </td>
        <td className="border px-4 py-2 ">
          <Popover placement="left-start" color="foreground">
            <PopoverTrigger>
              <button className="capitalize border-1 border-black rounded-md p-1 hover:border-white ">
                <HiOutlineBars3 className="cursor-pointer text-white" />
              </button>
            </PopoverTrigger>

            <PopoverContent>
              <div className="px-2 py-2 flex flex-col justify-center items-center gap-2">
                <button
                  onClick={
                    isAuthenticated ? handleDuplicate : () => navigate("/auth")
                  }
                  className=" font-bold w-full rounded-md flex items-center justify-start gap-2 px-2 py-2 hover:bg-gray-700"
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
                  onClick={isAuthenticated ? onOpen : () => navigate("/auth")}
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
                  onClick={() =>
                    isAuthenticated
                      ? handleDelete(cabin.$id)
                      : navigate("/auth")
                  }
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
});

export default Cabin;
