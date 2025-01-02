import React from "react";
import { Theme, Heading, Text, Box, Container, Button } from "@radix-ui/themes";
import {
  HomeIcon,
  ReloadIcon,
  EnterIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

const errorTypes = {
  404: {
    title: "Page Not Found",
    message: "Oops! The page you're looking for doesn't exist.",
    action: "Go back to the homepage or use the search bar.",
    button: {
      text: "Go to Homepage",
      icon: HomeIcon,
      action: "/",
    },
    color: "blue",
  },
  401: {
    title: "Unauthorized Access",
    message: "You are not authorized to access this page.",
    action: "Please log in to view this content.",
    button: {
      text: "Log In",
      icon: EnterIcon,
      action: "/auth/login",
    },
    color: "amber",
  },
  500: {
    title: "Internal Server Error",
    message: "Something went wrong on our end. Please try again later.",
    action: "If the issue persists, please contact support.",
    button: {
      text: "Try Again",
      icon: ReloadIcon,
      action: null,
    },
    color: "red",
  },
  400: {
    title: "Bad Request",
    message: "The request could not be understood by the server.",
    action: "Please check the information you entered and try again.",
    button: {
      text: "Try Again",
      icon: ReloadIcon,
      action: null,
    },
    color: "orange",
  },
  503: {
    title: "Service Unavailable",
    message: "The service is temporarily unavailable. Please try again later.",
    action: "We are working on it. Please check back soon.",
    button: {
      text: "Get Help",
      icon: QuestionMarkCircledIcon,
      action: "/support",
    },
    color: "purple",
  },
};

const ErrorPage = ({ code = 500 }) => {
  const error = errorTypes[code] || errorTypes[500];
  const ButtonIcon = error.button.icon;

  const handleAction = () => {
    if (error.button.action) {
      window.location.href = error.button.action;
    } else {
      window.location.reload();
    }
  };

  return (
    <Box className="min-h-screen w-full flex items-center justify-center ">
      <Container
        size={{ initial: "1", sm: "2", md: "3" }}
        className="py-8 px-4"
      >
        <Box className="text-center">
          {/* Error Code and Icon */}
          <Box className="flex flex-row gap-4 mb-8 items-center justify-center">
            <Box className="flex justify-center items-center"></Box>

            <Box>
              <Text
                size={{ initial: "8", sm: "9" }}
                weight="bold"
                className={`text-${error.color}-500`}
              >
                {code}
              </Text>
            </Box>
          </Box>

          {/* Title */}
          <Box className="mb-8">
            <Heading size={{ initial: "6", sm: "7", md: "8" }} weight="bold">
              {error.title}
            </Heading>
          </Box>

          {/* Message */}
          <Box className="mb-2">
            <Text color="gray" size={{ initial: "3", sm: "4" }}>
              {error.message}
            </Text>
          </Box>

          {/* Action Text */}
          <Box className="mb-8">
            <Text color="gray" size={{ initial: "2", sm: "3" }}>
              {error.action}
            </Text>
          </Box>

          {/* Action Button */}
          <Box className="pt-3">
            <Button
              size={{ initial: "2", sm: "3" }}
              onClick={handleAction}
              variant="solid"
              color={error.color}
            >
              <ButtonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {error.button.text}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorPage;
