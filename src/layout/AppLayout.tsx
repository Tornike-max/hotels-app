import { Link, Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { paths } from "../constants/constant";
import { useGetUserContext } from "../context/useGetUserContext";
import { Avatar } from "@nextui-org/react";

export default function AppLayout() {
  const { userFromDB, isAuthenticated } = useGetUserContext();

  console.log(isAuthenticated, userFromDB);

  return (
    <div className="w-full h-screen mx-auto bg-black flex">
      <aside className="w-full sm:w-1/3 md:w-1/4 border-r-[1px] border-gray-700 overflow-y-auto">
        <div className="sticky top-0 py-4 px-2 w-full ">
          {isAuthenticated ? (
            <Link
              to={`/${userFromDB && userFromDB[0]?.username}`}
              className="w-full flex items-center gap-3 px-3"
            >
              <Avatar
                className="cursor-pointer"
                src={userFromDB && userFromDB[0]?.imageUrl}
              />
              <div className="w-full flex flex-col justify-center items-start text-white">
                <span className="text-sm">
                  {userFromDB && userFromDB[0]?.name}
                </span>
                <span className="text-xs text-slate-500">
                  {userFromDB && userFromDB[0]?.email}
                </span>
              </div>
            </Link>
          ) : (
            <h1 className="text-lg sm:text-xl md:text-2xl text-white font-bold text-center py-4">
              Oasis
            </h1>
          )}

          <ul className="flex flex-col py-10 gap-6 text-md sm:text-xl md:text-2xl">
            {paths.map((link, i) => (
              <Sidebar key={i} path={link.path} label={link.label} />
            ))}
          </ul>
        </div>
      </aside>
      <main
        role="main"
        className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2 overflow-y-auto"
      >
        <Outlet />
      </main>
    </div>
  );
}
