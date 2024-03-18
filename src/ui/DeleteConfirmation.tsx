import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import { useDeleteBooking } from "../queryHooks/useDeleteBooking";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({
  isOpen,
  onOpenChange,
  documentId,
  onClose,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  documentId: string;
  onClose: () => void;
}) => {
  const { deleteBookingMutation, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const handleDeleteBooking = () => {
    if (!documentId) return;
    deleteBookingMutation(documentId, {
      onSuccess: () => {
        navigate("/bookings");
      },
      onSettled: () => {
        onClose();
      },
    });
  };
  return (
    <Modal
      className="bg-slate-800 text-white"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Booking
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex justify-center items-center">
                <p className="text-red-500 font-semibold text-medium md:text-lg">
                  Are you sure, You want to delete selected booking?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="text-white hover:text-black"
                color="default"
                variant="ghost"
                onPress={onClose}
              >
                Nah! Go back
              </Button>
              <Button
                className="text-white"
                color="danger"
                variant="ghost"
                onClick={handleDeleteBooking}
                disabled={isDeleting}
              >
                {isDeleting ? <Spinner size="sm" /> : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmation;
