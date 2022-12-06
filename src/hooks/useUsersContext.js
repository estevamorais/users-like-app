import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    console.log("Not Found Context");
  }

  return context;
};
