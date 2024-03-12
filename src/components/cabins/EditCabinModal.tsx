import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CabinEditType } from "../../types/types";
import { useEditCabin } from "../../queryHooks/useEditCabin";
import { useGetSelectedCabin } from "../../queryHooks/useGetSelectedCabin";

const EditCabinModal = ({
  onOpenChange,
  isOpen,
  documentId,
}: {
  onOpenChange: () => void;
  isOpen: boolean;
  documentId: string;
}) => {
  const { register, handleSubmit, reset } = useForm<CabinEditType>();
  const { updateCabin, isPending } = useEditCabin();
  const { data, isPending: isCabinPending } = useGetSelectedCabin(documentId);

  const onSubmit: SubmitHandler<CabinEditType> = (data) => {
    if (!data) return;
    const updatedData = {
      name: data?.name,
      description: data.description,
      discount: Number(data.discount),
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
    };
    updateCabin({ documentId, updatedData });
    reset();
  };

  if (isCabinPending)
    return (
      <div className="w-full flex justify-center items-center pt-40">
        <Spinner size="lg" />
      </div>
    );

  console.log(data);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Name"
                    placeholder="Enter Cabin Name"
                    variant="bordered"
                    {...register("name")}
                  />
                  <Input
                    label="Description"
                    placeholder="Enter Description"
                    variant="bordered"
                    {...register("description")}
                  />
                  <Input
                    label="Discount"
                    placeholder="Enter Discount Value"
                    variant="bordered"
                    {...register("discount")}
                  />
                  <Input
                    label="Capacity"
                    placeholder="Enter Max Capacity"
                    variant="bordered"
                    {...register("maxCapacity")}
                  />
                  <Input
                    label="Price"
                    placeholder="Enter New Price"
                    variant="bordered"
                    {...register("regularPrice")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    {isPending ? <Spinner size="sm" /> : "Edit"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCabinModal;
