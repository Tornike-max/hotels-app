import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
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

  if (isCabinPending) return null;

  console.log(data);

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    variant="bordered"
                    defaultValue={data?.description}
                    {...register("description")}
                  />
                  <Input
                    autoFocus
                    label="Name"
                    placeholder="Enter Cabin Name"
                    variant="bordered"
                    defaultValue={data?.name}
                    {...register("name")}
                  />

                  <Input
                    label="Discount"
                    placeholder="Enter Discount Value"
                    variant="bordered"
                    defaultValue={data?.discount}
                    {...register("discount")}
                  />
                  <Input
                    label="Capacity"
                    placeholder="Enter Max Capacity"
                    variant="bordered"
                    defaultValue={data?.maxCapacity}
                    {...register("maxCapacity")}
                  />
                  <Input
                    label="Price"
                    placeholder="Enter New Price"
                    variant="bordered"
                    defaultValue={data?.regularPrice}
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
    </div>
  );
};

export default EditCabinModal;
