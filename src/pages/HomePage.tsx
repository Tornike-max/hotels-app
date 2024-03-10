import { useGetUserContext } from "../context/useGetUserContext";

export default function HomePage() {
  const { user, userFromDB } = useGetUserContext();

  console.log(userFromDB, user);

  return (
    <div>
      <img />
    </div>
  );
}
