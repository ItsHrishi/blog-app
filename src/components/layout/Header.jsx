import {
  Button,
  Text,
  Flex,
  IconButton,
  Container,
  TextField,
  Dialog,
} from "@radix-ui/themes";
import {
  SunIcon,
  MoonIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./layoutStyles.css";
import { useSelector } from "react-redux";
import LogoutButton from "../common/LogoutButton";

const Header = ({ handleThemeChange, theme }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  return (
    <Container
      className="w-full sticky top-0 z-20 drop-shadow-md"
      p="4"
      style={{
        backgroundColor: "var(--color-background)", // Use Radix UI theme variable
      }}
    >
      <Flex direction="row" align="center" justify="between">
        {/* logo */}
        <Link to="/">
          <Text>Blog Spot</Text>
        </Link>

        {/* search */}
        <div className="hidden-search">
          <TextField.Root
            size="3"
            variant="soft"
            placeholder="Search the articles…"
            style={{ width: "350px" }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </div>

        {/* action */}
        <Flex gap="2">
          <IconButton
            highContrast
            onClick={handleThemeChange}
            variant="soft"
            radius="full"
            size={{
              initial: "2",
              md: "3",
            }}
            style={{ cursor: "pointer" }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          {!authStatus && (
            <>
              <Link to="/auth/login">
                <Button
                  size={{
                    initial: "2",
                    md: "3",
                  }}
                  highContrast
                  variant="outline"
                  radius="large"
                  style={{ cursor: "pointer" }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button
                  size={{
                    initial: "2",
                    md: "3",
                  }}
                  highContrast
                  variant="solid"
                  radius="large"
                  style={{ cursor: "pointer" }}
                >
                  Signup
                </Button>
              </Link>
            </>
          )}
          {authStatus && (
            <>
              <LogoutButton>Logout</LogoutButton>
              <Link to="/add-post">
                <Button
                  size={{
                    initial: "2",
                    md: "3",
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Write
                </Button>
              </Link>
              <Link to={`/profile/${userData.$id}`}>
                <Button
                  size={{
                    initial: "2",
                    md: "3",
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Profile
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
