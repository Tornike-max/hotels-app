import { useParams } from "react-router-dom";
import ProfileContent from "../components/profile/ProfileContent";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useGetUserById } from "../queryHooks/useGetUserById";
import { Spinner } from "@nextui-org/react";

export default function ProfilePage() {
  const { userId } = useParams();
  const { userData, isUserPending } = useGetUserById(userId || "");
  if (isUserPending)
    return (
      <div className="w-full flex justify-center items-center pt-20 sm:pt-40">
        <Spinner size="lg" />
      </div>
    );
  console.log(userData);
  return (
    <div className="max-w-[2200px] h-screen w-full flex flex-col justify-start items-center m-auto">
      <ProfileHeader userFromDB={userData} />
      <ProfileContent userFromDB={userData} />
    </div>
  );
}
