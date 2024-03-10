import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

import { useUpdateUserInfo } from "../../queryHooks/useUpdateUserInfo";
import { useGetUserContext } from "../../context/useGetUserContext";
import ProfileModalChangePhone from "./ProfileModalChangePhone";
import ProfileModalChangeEmailandPassword from "./ProfileModalChangeEmailandPassword";
import ProfileModalChangeLocation from "./ProfileModalChangeLocation";

export default function ProfileEditModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const { updateInfo, isPending } = useUpdateUserInfo();
  const { userFromDB } = useGetUserContext();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      size="2xl"
    >
      <ModalContent className="overflow-y-auto h-[400px] bg-slate-950 border-gray-700 text-white">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Profile
            </ModalHeader>
            <ModalBody>
              <ProfileModalChangePhone
                updateInfo={updateInfo}
                isPending={isPending}
                userFromDB={userFromDB}
              />
              <ProfileModalChangeEmailandPassword
                updateInfo={updateInfo}
                isPending={isPending}
                userFromDB={userFromDB}
              />
              <ProfileModalChangeLocation
                isPending={isPending}
                updateInfo={updateInfo}
                userFromDB={userFromDB}
              />
              <Button
                type="button"
                color="danger"
                variant="shadow"
                onPress={onClose}
              >
                Close
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
