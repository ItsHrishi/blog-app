import { Button } from "@radix-ui/themes";
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/features/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <Button
      size={{
        initial: "2",
        md: "3",
      }}
      style={{ cursor: "pointer" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
