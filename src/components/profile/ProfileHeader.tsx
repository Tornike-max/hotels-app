import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { MdLocationPin } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import ProfileEditModal from "./ProfileEditModal";
import { useGetUserContext } from "../../context/useGetUserContext";

export default function ProfileHeader() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { userFromDB } = useGetUserContext();

  return (
    <div className="w-full flex justify-center items-center py-8 px-10 mx-10 my-8 rounded-sm border-[1px] border-gray-700">
      <div className="w-full flex justify-start items-center gap-4">
        <div className="w-20 h-20">
          <Avatar
            className="cursor-pointer"
            src={userFromDB && userFromDB[0].imageUrl}
            size="lg"
            name="user"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <div className="w-full flex justify-start items-center gap-6">
            <h1 className="text-xl font-semibold text-white">Ron Swanson</h1>
            <Button
              size="md"
              className="text-white"
              variant="shadow"
              color="success"
              onClick={onOpen}
            >
              Edit My Profile
            </Button>
            <ProfileEditModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <div className="w-full flex justify-start items-center gap-4">
            <p className="flex items-center gap-2 text-white">
              <MdLocationPin className="text-lg " />
              <span>Tbilisi Georgia</span>
            </p>
            <p className="flex items-center gap-2 text-white">
              <TbBrandBooking className="text-lg " />
              <span>10 Bookings</span>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-white text-xs">
              Emma Jones is a passionate traveler and amateur photographer
              hailing from a quaint town in the Midwest. With a keen eye for
              detail and a thirst for adventure, she spends her days capturing
              the beauty of nature and exploring new cultures. When she's not
              behind the lens, you can find her curled up with a good book or
              enjoying a cup of coffee at her favorite local café.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
