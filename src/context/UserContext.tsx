import { createContext, useEffect, useState } from "react";
import { Models } from "appwrite";
import { getUser } from "../api/data";
import toast from "react-hot-toast";

const initialState: UserContextType = {
  user: null,
  isLoading: true,
  userFromDB: null,
  isAuthenticated: false,
};

type UserContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  userFromDB: Models.Document[] | null;
  isAuthenticated: boolean;
};

export const UserContext = createContext<UserContextType>(initialState);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [userFromDB, setUserFromDB] = useState<Models.Document[] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem("cookieFallback") &&
      localStorage.getItem("cookieFallback") === "[]"
    )
      throw new Error("Error while getting data in context");

    const getData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        if (userData) {
          setUserFromDB(userData.userFromDB);
          setUser(userData.authUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        toast.error("error while getting data");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof userFromDB === "string") {
      setUserFromDB(null);
    }
  }, [userFromDB]);

  const values = {
    user: isAuthenticated ? user : null,
    userFromDB: isAuthenticated ? userFromDB : null,
    isLoading: isLoading,
    isAuthenticated: isAuthenticated,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
