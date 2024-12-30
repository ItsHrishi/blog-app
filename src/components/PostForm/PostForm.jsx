import React, { useState } from "react";
import {
  Card,
  Flex,
  Text,
  Box,
  Button,
  TextField,
  Switch,
  Select,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

const categoriesList = [
  "Technology",
  "Lifestyle",
  "Education",
  "Food",
  "Finance",
  "Entertainment",
  "Sports",
  "Environment",
];

const PostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      isActive: false,
      category: "",
      image: null,
    },
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("isActive", data.isActive);
    formData.append("category", data.category);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center px-4">
      <Card className="w-full my-3 max-w-2xl">
        <Flex
          direction="column"
          justify="center"
          align="center"
          className="p-2 md:p-4"
        >
          <Text
            as="h2"
            className="text-lg mb-6 sm:text-xl md:text-2xl font-bold"
          >
            Create New Article
          </Text>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
          >
            <Box className="mb-2 sm:mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="title"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Title
              </Text>
              <TextField.Root
                id="title"
                size="3"
                placeholder="Enter article title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                  maxLength: {
                    value: 150,
                    message: "Title must be not more than 150 characters",
                  },
                })}
              />
              {errors.title && (
                <Text size="2" color="red" className="mt-1">
                  {errors.title.message}
                </Text>
              )}
            </Box>

            <Box className="mb-2 sm:mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="image"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Featured Image
              </Text>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="w-full p-2 border rounded-md "
                style={{ outlineColor: "var(--accent-7)" }}
                {...register("image")}
                onChange={handleImageChange}
              />
              {previewImage && (
                <div className="mt-2">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-w-full h-auto rounded-md"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
              {errors.image && (
                <Text size="2" color="red" className="mt-1">
                  {errors.image.message}
                </Text>
              )}
            </Box>

            <Box className="mb-2 sm:mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="content"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Content
              </Text>
              <RichTextEditor
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
                trigger={trigger}
              />
              {errors.content && (
                <Text size="2" color="red" className="mt-1">
                  {errors.content.message}
                </Text>
              )}
            </Box>

            <Box className="mb-4 lg:mb-6 w-full">
              <Text
                as="label"
                htmlFor="content"
                size="3"
                weight="medium"
                className="block mb-2"
              >
                Category
              </Text>
              <Select.Root
                size="3"
                style={{ width: "100%" }}
                onValueChange={(value) => {
                  setValue("category", value);
                }}
              >
                <Select.Trigger
                  placeholder="Select a category"
                  style={{ width: "100%" }}
                />
                <Select.Content
                  style={{ width: "var(--radix-select-trigger-width)" }}
                  position="popper"
                  {...register("category")}
                >
                  {categoriesList.map((category) => (
                    <Select.Item value={category}>{category}</Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Box>

            <Box className="mb-4 lg:mb-6 w-full">
              <Flex align="center" gap="2">
                <Text as="label" htmlFor="isActive" size="3" weight="medium">
                  Active Status
                </Text>
                <Switch
                  id="isActive"
                  onCheckedChange={(checked) => {
                    setValue("isActive", checked);
                  }}
                  value={getValues("isActive")}
                />
              </Flex>
              <Text size="2" color="gray" className="mt-1">
                Toggle to set article visibility
              </Text>
            </Box>

            <Button
              type="submit"
              size="3"
              highContrast
              variant="solid"
              radius="large"
            >
              Publish Article
            </Button>
          </form>
        </Flex>
      </Card>
    </div>
  );
};

export default PostForm;
