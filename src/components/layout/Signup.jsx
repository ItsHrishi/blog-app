import React, { useState } from "react";
import { Card, Flex, Text, Box, Button, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const user = await authService.registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      console.log(user);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center  px-4">
      <Card className="w-full my-2 sm:my-4 md:my-6 lg:my-8 max-w-md">
        <Flex
          direction="column"
          justify="center"
          align="center"
          className="p-6 md:p-8"
        >
          <Text as="h2" size="5" weight="bold" className="mb-6">
            Sign Up
          </Text>
          {authError && <Text color="red">{authError}</Text>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
          >
            <Box className="mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="name"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Full Name
              </Text>
              <TextField.Root
                id="name"
                type="text"
                size="3"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <Text size="2" color="red" className="mt-1">
                  {errors.name.message}
                </Text>
              )}
            </Box>

            <Box className="mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="email"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Email Address
              </Text>
              <TextField.Root
                id="email"
                type="email"
                size="3"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <Text size="2" color="red" className="mt-1">
                  {errors.email.message}
                </Text>
              )}
            </Box>

            <Box className="mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="password"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Password
              </Text>
              <TextField.Root
                id="password"
                type="password"
                size="3"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <Text size="2" color="red" className="mt-1">
                  {errors.password.message}
                </Text>
              )}
            </Box>

            <Box className="mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="confirmPassword"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Confirm Password
              </Text>
              <TextField.Root
                id="confirmPassword"
                type="password"
                size="3"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <Text size="2" color="red" className="mt-1">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </Box>

            <Button
              loading={loading}
              size="3"
              highContrast
              variant="solid"
              radius="large"
            >
              Sign Up
            </Button>
          </form>

          <Text
            size="2"
            color="gray"
            className="mt-4 sm:mt-4 lg:mt-6 text-center"
          >
            Already have an account?{" "}
            <Link to="/auth/login">
              <Text
                as="a"
                href="#"
                className="text-black dark:text-white hover:underline"
              >
                Login
              </Text>
            </Link>
          </Text>
        </Flex>
      </Card>
    </div>
  );
};

export default SignupPage;
