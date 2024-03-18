import { Link, useLocation } from "react-router-dom";
import { paths } from "../constants/constant";
import { useGetUserContext } from "../context/useGetUserContext";
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { HiOutlineArrowLeftOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useLogout } from "../queryHooks/useLogout";

const Header = () => {
  const { pathname } = useLocation();
  const { userFromDB, isAuthenticated, setIsAuthenticated } =
    useGetUserContext();
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    if (isAuthenticated) {
      await logout();
      setIsAuthenticated(false);
    }
  };
  return (
    <div className="flex w-full justify-center items-center py-4 px-10">
      <ul className="w-full flex justify-between items-center">
        {paths.slice(0, 2).map((path) => (
          <Link
            className={`text-white py-1 px-2 hover:bg-primary-500  ${
              pathname === `/${path.path}` ? "bg-primary-500" : "bg-none"
            } rounded-md duration-150 transition-all`}
            to={`/${path.path}`}
            key={path.label}
          >
            {path.label}
          </Link>
        ))}

        {isAuthenticated ? (
          <Popover placement="bottom-start" color="primary">
            <PopoverTrigger>
              <button className="flex items-center gap-1 sm:gap-2">
                <Avatar
                  src={userFromDB && userFromDB[0].imageUrl}
                  className="w-8 h-8 sm:w-10 sm:h-10 "
                />
                <div className="flex flex-col justify-center items-start text-xs text-white">
                  <p>{userFromDB && userFromDB[0].name}</p>
                  <p>{userFromDB && userFromDB[0].email}</p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-gray-800 w-full shadow-xl">
              <div className="px-2 py-2 flex flex-col justify-center items-center gap-2">
                <Link
                  to={`/profile/${userFromDB && userFromDB[0].$id}`}
                  className="w-full py-1 px-2 hover:bg-primary-500 rounded-md flex items-center gap-1 text-lg"
                >
                  <HiOutlineUser />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-1 px-2 hover:bg-primary-500 rounded-md flex items-center gap-1 text-lg"
                >
                  {isPending ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <HiOutlineArrowLeftOnRectangle />
                      Log out
                    </>
                  )}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            to="/auth"
            className={`text-white py-1 px-2 hover:bg-primary-500 rounded-md duration-150 transition-all`}
          >
            Login
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Header;

//           to={`/profile/${userFromDB && userFromDB[0].$id}`}
