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
import { Link } from "react-router-dom";
import "./layoutStyles.css";

const Header = ({ handleThemeChange, theme }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
        <Text>Blog Spot</Text>

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
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          <Button
            size={{
              initial: "2",
              md: "3",
            }}
            highContrast
            variant="outline"
            radius="full"
          >
            Login
          </Button>
          <Button
            size={{
              initial: "2",
              md: "3",
            }}
            highContrast
            variant="solid"
            radius="full"
          >
            Signup
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
