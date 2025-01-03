import { Theme, Box, Flex, Text, Container } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import { useEffect, useState } from "react";
import FullPageLoading from "./components/common/FullPageLoading";

const AuthLayout = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const themeAppearance = theme?.theme || "light";

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <FullPageLoading />
  ) : (
    <Theme accentColor="gray" radius="large" appearance={themeAppearance}>
      {/* header */}
      <Container
        className="w-full sticky top-0 z-20 drop-shadow-md"
        p="4"
        style={{
          backgroundColor: "var(--color-background)",
        }}
      >
        <Flex justify="center" align="center">
          <Text size="3" weight="bold">
            Welcome to the Blog App
          </Text>
        </Flex>
      </Container>

      <div className="flex-grow">
        <div className="min-h-[780px] overflow-y-auto">
          <Outlet />
        </div>
      </div>
      {/* Footer */}
      <Container className="w-full bg-black px-4  lg:fixed sm:bottom-0 left-0">
        <Flex
          direction={{ initial: "column", sm: "row" }}
          align={{ initial: "center", sm: "center" }}
          justify={{ initial: "center", sm: "between" }}
          className="md:py-6 py-2  space-y-4 sm:space-y-0"
        >
          {/* Footer Logo or Title */}
          <Text className="text-lg font-medium text-white">Blog Post</Text>

          {/* Navigation Links */}
          <Flex
            direction="row"
            align="center"
            gap="4"
            className="mt-4 sm:mt-0"
            // className="text-center sm:text-left"
          >
            <Link
              className="text-white hover:text-gray-400 transition-colors duration-200"
              to="/about"
            >
              About
            </Link>
            <Link
              className="text-white hover:text-gray-400 transition-colors duration-200"
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className="text-white hover:text-gray-400 transition-colors duration-200"
              to="/privacy"
            >
              Privacy Policy
            </Link>
          </Flex>
        </Flex>
        {/* Copyright Info */}
        <Flex
          direction="row"
          align="center"
          justify="center"
          className="w-full py-4 border-t border-gray-700 text-center"
        >
          <Text className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Blog Post. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Theme>
  );
};

export default AuthLayout;
