import React, { useState } from "react";
import { Card, Flex, Text, Box, Button, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/features/authSlice";

const LoginPage = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const session = await authService.login({
        email: data.email,
        password: data.password,
      });
      console.log("data after login ", session);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log("login : userdata : ", userData);
          dispatch(authLogin(userData));
        }
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <Card className="w-full sm:mt-4 md:mt-6 lg:mt-8 my-2 max-w-md ">
        <Flex
          direction="column"
          justify="center"
          align="center"
          className="p-6 md:p-8"
        >
          <Text as="h2" size="5" weight="bold" className="mb-6">
            Login
          </Text>
          {authError && <Text color="red">{authError}</Text>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
          >
            <Box className=" mb-2 sm:mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="email"
                size="3"
                weight="medium"
                className="block mb-2 "
              >
                Email Address
              </Text>
              <TextField.Root
                id="email"
                type="email"
                placeholder="Enter your email"
                size="3"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <Text size="2" color="red" className="mt-1">
                  {errors.email.message}
                </Text>
              )}
            </Box>

            <Box className=" mb-2 sm:mb-4 lg:mb-6 w-full">
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
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <Text size="2" color="red" className="mt-1">
                  {errors.password.message}
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
              Login
            </Button>
          </form>

          <Text
            size="2"
            color="gray"
            className="mt-2 sm:mt-4 lg:mt-6 text-center "
          >
            Don't have an account?{" "}
            <Link to="/auth/signup">
              <Text
                as="a"
                href="#"
                className="text-black dark:text-white hover:underline"
              >
                Sign up
              </Text>
            </Link>
          </Text>
        </Flex>
      </Card>
    </div>
  );
};

export default LoginPage;
