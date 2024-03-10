import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useGetUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) throw new Error("error while using context");
  return context;
};
