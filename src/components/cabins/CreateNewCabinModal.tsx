import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CabinCreateType } from "../../types/types";
import { useCreateCabin } from "../../queryHooks/useCreateCabin";
import { memo } from "react";

const CreateNewCabinModal = memo(
  ({
    isOpen,
    onOpenChange,
    onClose,
  }: {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
  }) => {
    const { register, handleSubmit } = useForm<CabinCreateType>();
    const { createCabin, isCreating } = useCreateCabin();
    const onSubmit: SubmitHandler<CabinCreateType> = (data) => {
      const imageUrl = data.imageUrl;
      const newData = { ...data, imageUrl: imageUrl };
      createCabin(newData);
      onClose();
    };
    return (
      <Modal
        className="bg-gray-950 text-white mx-4"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center items-center flex-col"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create New Cabin
                </ModalHeader>
                <ModalBody>
                  <div className="w-full flex items-center justify-between gap-2">
                    <label className="text-white text-base sm:text-lg w-full hidden sm:block">
                      Cabin Name
                    </label>
                    <Input
                      autoFocus
                      label="Cabin Name"
                      placeholder="Enter Cabin Name"
                      variant="flat"
                      className="w-full"
                      {...register("name", {
                        required: "This Field Is Required",
                      })}
                    />
                  </div>

                  <div className="w-full flex items-center justify-between gap-2">
                    <label className="text-white text-base sm:text-lg w-full hidden sm:block">
                      Maximum capacity
                    </label>
                    <Input
                      autoFocus
                      label="Maximum capacity"
                      placeholder="Enter Maximum capacity"
                      variant="flat"
                      className="w-full"
                      {...register("maxCapacity", {
                        required: "This Field Is Required",
                      })}
                    />
                  </div>
                  <div className="w-full flex items-center justify-between gap-2">
                    <label className="text-white text-base sm:text-lg w-full hidden sm:block">
                      Regular price
                    </label>
                    <Input
                      autoFocus
                      label="Regular price"
                      placeholder="Enter Regular price"
                      variant="flat"
                      className="w-full"
                      {...register("regularPrice", {
                        required: "This Field Is Required",
                      })}
                    />
                  </div>
                  <div className="w-full flex items-center justify-between gap-2">
                    <label className="text-white text-base sm:text-lg w-full hidden sm:block">
                      Discount
                    </label>
                    <Input
                      autoFocus
                      label="Discount"
                      placeholder="Enter Discount"
                      variant="flat"
                      className="w-full"
                      {...register("discount", {
                        required: "This Field Is Required",
                      })}
                    />
                  </div>
                  <div className="w-full flex items-center justify-between gap-2">
                    <label className="text-white text-base sm:text-lg w-full hidden sm:block">
                      Description for website
                    </label>
                    <Input
                      autoFocus
                      label="Description for website"
                      placeholder="Enter Description for website"
                      variant="flat"
                      className="w-full"
                      {...register("description", {
                        required: "This Field Is Required",
                      })}
                    />
                  </div>

                  <div className="w-full flex items-center justify-between gap-2">
                    <label className="text-white text-base sm:text-lg w-full hidden sm:block">
                      Cabin Photo
                    </label>
                    <Input
                      autoFocus
                      type="file"
                      variant="flat"
                      className="w-full"
                      {...register("imageUrl", {
                        required: "This Field Is Required",
                      })}
                    />
                  </div>
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
                    {isCreating ? (
                      <Spinner size="sm" color="default" />
                    ) : (
                      "Create Cabin"
                    )}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    );
  }
);

export default CreateNewCabinModal;
