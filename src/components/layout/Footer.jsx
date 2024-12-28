import { Text, Flex, IconButton, Container } from "@radix-ui/themes";
import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Container className="w-full bg-black text-white">
        <Flex
          direction={{ initial: "column", sm: "row" }}
          align={{ initial: "center", sm: "center" }}
          justify={{ initial: "center", sm: "between" }}
          className="py-6 space-y-4 sm:space-y-0"
        >
          {/* Footer Logo or Title */}
          <Text className="text-lg font-medium text-white">Blog Post</Text>

          {/* Navigation Links */}
          <Flex
            direction={{ initial: "column", sm: "row" }}
            align="center"
            gap={{ initial: "4", sm: "6" }}
            className="text-center sm:text-left"
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

          {/* Social Media Icons */}
          <Flex direction="row" align="center" gap="4" className="mt-4 sm:mt-0">
            <IconButton
              variant="classic"
              highContrast
              as="a"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="w-5 h-5" />
            </IconButton>
            <IconButton
              variant="classic"
              highContrast
              as="a"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterLogoIcon className="w-5 h-5" />
            </IconButton>
            <IconButton
              variant="classic"
              highContrast
              as="a"
              href="mailto:example@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EnvelopeClosedIcon className="w-5 h-5" />
            </IconButton>
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
    </>
  );
};

export default Footer;