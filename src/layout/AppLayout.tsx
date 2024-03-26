import { Link, Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { paths } from "../constants/constant";
import { useGetUserContext } from "../context/useGetUserContext";
import { Avatar, Spinner } from "@nextui-org/react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { useLogout } from "../queryHooks/useLogout";

export default function AppLayout() {
  const { userFromDB, isAuthenticated, setIsAuthenticated } =
    useGetUserContext();
  const sessionId = localStorage.getItem("cookieFallback");
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    if (!sessionId) return;
    await logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="max-w-[2200px] w-full min-h-screen bg-gray-950 flex flex-col lg:flex-row">
      {/* Sidebar (Only on larger screens) */}
      <aside className="max-w-xs w-full h-screen lg:flex-shrink-0 lg:border-r-[1px] bg-black shadow-transparent lg:border-gray-700 hidden lg:block overflow-y-auto sticky top-0 left-0">
        <div className="w-full flex justify-center items-center flex-col p-10">
          {isAuthenticated ? (
            <Link
              to={`profile/${userFromDB && userFromDB[0]?.$id}`}
              className="w-full flex items-center gap-2 px-2"
            >
              <Avatar
                className="cursor-pointer"
                src={userFromDB && userFromDB[0]?.imageUrl}
              />
              {userFromDB && userFromDB[0]?.imageUrl ? (
                <div className="w-full flex flex-col justify-center items-start text-white">
                  <span className="text-sm">
                    {userFromDB && userFromDB[0]?.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {userFromDB && userFromDB[0]?.email}
                  </span>
                </div>
              ) : (
                <Spinner size="sm" />
              )}
            </Link>
          ) : (
            <h1 className="text-lg sm:text-xl md:text-2xl text-white font-bold text-center py-4">
              Oasis
            </h1>
          )}

          <ul className="w-full flex flex-col py-10 gap-6 text-md md:text-2xl">
            {paths.map((link, i) => (
              <Sidebar key={i} path={link.path} label={link.label} />
            ))}
            {isAuthenticated ? (
              <li
                onClick={() => handleLogout()}
                className={`w-full rounded-md text-white hover:bg-primary-600 hover:font-semibold py-2 px-3 duration-100 transition-all cursor-pointer `}
              >
                {isPending ? <Spinner size="sm" /> : "Log out"}
              </li>
            ) : (
              <Link
                to="/auth"
                className={`w-full rounded-md text-white hover:bg-primary-600 hover:font-semibold py-2 px-3 duration-100 transition-all cursor-pointer `}
              >
                Log in
              </Link>
            )}
          </ul>
        </div>
      </aside>

      {/* Header (Only on smaller screens) */}
      <header className="w-full lg:hidden border-b-[1px] bg-black z-50 border-gray-700 fixed top-0 left-0 right-0">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-20 lg:mt-4">
        <Outlet />
      </main>

      {/* Footer (Fixed at the bottom) */}
      <footer className="w-full lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t-[1px] border-gray-700 flex justify-center items-center py-2 mt-10 bg-black">
        <Footer />
      </footer>
    </div>
  );
}
