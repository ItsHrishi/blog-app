import React from "react";
import { Card, Flex, Text, Box, Button, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                {...register("email", { required: "Email is required" })}
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
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <Text size="2" color="red" className="mt-1">
                  {errors.password.message}
                </Text>
              )}
            </Box>

            <Button size="3" highContrast variant="solid" radius="large">
              Login
            </Button>
          </form>

          <Text size="2" className="mt-2 sm:mt-4 lg:mt-6 text-center ">
            Don't have an account?{" "}
            <Text as="a" href="#" className=" hover:underline">
              Sign up
            </Text>
          </Text>
        </Flex>
      </Card>
    </div>
  );
};

export default LoginPage;
