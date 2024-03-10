import ProfileContent from "../components/profile/ProfileContent";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function ProfilePage() {
  return (
    <div className="max-w-[2200px] w-full flex flex-col justify-center items-center">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}
