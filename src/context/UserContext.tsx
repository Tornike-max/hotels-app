// Import dependencies and custom hooks
import { createContext, useEffect, useState } from "react";
import { Models } from "appwrite";
import { getUser } from "../api/data";
import toast from "react-hot-toast";

// Define initial state and context type
const initialState: UserContextType = {
  user: null,
  isLoading: true,
  userFromDB: null,
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // Default value for setIsAuthenticated
};

type UserContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  userFromDB: Models.Document[] | null;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Function type
};

// Create UserContext
export const UserContext = createContext<UserContextType>(initialState);

// UserContextProvider component
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
          if (localStorage.getItem("cookieFallback")) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
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

  // Provide context values
  const values = {
    user: isAuthenticated ? user : null,
    userFromDB: isAuthenticated ? userFromDB : null,
    isLoading: isLoading,
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
