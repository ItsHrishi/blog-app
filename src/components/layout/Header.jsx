import {
  Button,
  Text,
  Flex,
  IconButton,
  Container,
  TextField,
  Dialog,
  DropdownMenu,
  Avatar,
} from "@radix-ui/themes";
import {
  SunIcon,
  MoonIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  DropdownMenuIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./layoutStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/authSlice";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";

const Header = ({ handleThemeChange, theme }) => {
  const [userMetaData, setUserMetaData] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logout");
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  const fetchData = async () => {
    const data = await appwriteService.getAuthorMetaData(userData.$id);
    setUserMetaData(data?.documents[0]);
  };

  useEffect(() => {
    if (userData) {
      fetchData();
    }
  }, []);
  console.log("userMetaData : ", userMetaData);

  return (
    <Container
      className="w-full sticky top-0 z-20 drop-shadow-md"
      p="4"
      style={{
        backgroundColor: "var(--color-background)",
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
        <Flex gap="3">
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
            <DropdownMenuComponent
              userMetaData={userMetaData}
              userData={userData}
              handleLogout={handleLogout}
            />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

const DropdownMenuComponent = ({ userData, userMetaData, handleLogout }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          type="button"
          className="focus:outline-none focus:ring-2 rounded-full"
          style={{
            "--tw-ring-color": "var(--accent-7)",
          }}
          aria-label="User menu"
        >
          <Avatar
            size={{
              initial: "2",
              md: "3",
            }}
            src={
              userMetaData?.profileImage
                ? appwriteService.getProfileImagePreview(
                    userMetaData.profileImage
                  )
                : null
            }
            fallback={userData?.name ? userData?.name[0] : "h"}
            radius="full"
            className="cursor-pointer"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <Link to={`/profile/${userData.$id}`}>
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
        </Link>
        <DropdownMenu.Item>My Posts</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onClick={handleLogout}>
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Header;
