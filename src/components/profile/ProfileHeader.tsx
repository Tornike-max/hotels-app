import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { MdLocationPin } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import ProfileEditModal from "./ProfileEditModal";
import { HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { Models } from "appwrite";

export default function ProfileHeader({
  userFromDB,
}: {
  userFromDB: Models.Document | undefined;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full flex justify-center items-center py-8 px-10 my-8 rounded-sm border-[1px] border-gray-700">
      <div className="w-full flex justify-start items-center gap-4">
        <div className="w-20 h-20">
          <Avatar
            className="cursor-pointer"
            src={userFromDB?.imageUrl}
            size="lg"
            name="user"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <div className="w-full flex justify-start items-center gap-6">
            <h1 className="text-xl font-semibold text-white">
              {userFromDB?.name}
            </h1>
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
              <MdLocationPin className="text-lg" />
              <span>{userFromDB?.location || "No Location"}</span>
            </p>
            <p className="flex items-center gap-2 text-white">
              <TbBrandBooking className="text-lg" />
              <span>{userFromDB?.booking.length} Bookings</span>
            </p>
          </div>
          <div className="w-full flex justify-start items-center gap-4 text-base">
            <p className="flex items-center gap-2 text-white">
              <HiOutlinePhone className="text-lg" />
              <span className="text-white">
                {userFromDB?.phone.replace("+", "") || "No Phone Number"}
              </span>
            </p>

            <p className="flex items-center gap-2 text-white">
              <MdOutlineEmail className="text-lg" />
              <span className="text-white">
                {userFromDB?.email || "No Email"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
