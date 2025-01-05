import React, { useEffect, useState } from "react";
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
import { set, useForm } from "react-hook-form";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../common/Modal";

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

const PostForm = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [postDateImage, setPostDataImage] = useState("");
  const [oldPostData, setOldPostData] = useState();
  const userData = useSelector((state) => state.auth.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
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
      isActive: true,
      category: "",
      image: null,
    },
  });

  useEffect(() => {
    if (postId) {
      const fetchDetails = async () => {
        const postData = await appwriteService.getPost(postId);
        setOldPostData(postData);
        setValue("title", postData.title);
        setValue("content", postData.content);
        setValue("category", postData?.category);
        setValue("isActive", postData?.status);
        if (postData?.featuredImage) {
          setPostDataImage(
            appwriteService.getArticleImagePreview(postData?.featuredImage)
          );
        }
      };

      fetchDetails();
    }
  }, [postId, setValue]);

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

  const onSubmit = async (data) => {
    if (postId) {
      setLoading(true);

      let featuredImageId = null;

      if (previewImage) {
        const newFile = await appwriteService.updateFeatureImage(
          oldPostData.featuredImage,
          data.image[0]
        );
        if (newFile) {
          featuredImageId = newFile.$id;
        } else {
          console.error("Error uploading feature image");
        }
      }
      const readTime = Math.max(1, Math.round(wordCount / 150));
      const updateData = {};
      if (data.title !== oldPostData.title) updateData.title = data.title;
      if (data.content !== oldPostData.content)
        updateData.content = data.content;
      if (data.isActive !== oldPostData.status)
        updateData.status = data.isActive;
      if (data.category !== oldPostData.category)
        updateData.category = data.category;
      if (featuredImageId) updateData.featuredImage = featuredImageId;
      if (oldPostData.readTime !== readTime) updateData.readTime = readTime;

      const dbPost = appwriteService.updatePost(oldPostData.$id, updateData);

      if (dbPost) {
        navigate(`/post/${oldPostData.$id}`);
        setLoading(false);
      } else {
        console.error("Error creating post");
        setLoading(false);
      }

      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const readTime = Math.max(1, Math.round(wordCount / 150));
      let featuredImageId = null;

      if (previewImage) {
        const file = await appwriteService.uploadFeatureImage(data.image[0]);
        if (file) {
          featuredImageId = file.$id;
        } else {
          console.error("Error uploading feature image");
        }
      }

      const dbPost = await appwriteService.createPost({
        title: data?.title,
        featuredImage: featuredImageId,
        status: data.isActive,
        userId: userData.$id,
        category: data.category,
        content: data.content,
        readTime,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setValue("image", null);
    // console.log("clear : ", previewImage, getValues("image"));
  };

  const handleDeletePost = async () => {
    try {
      setDeleteLoading(true);
      if (oldPostData.featuredImage)
        await appwriteService.deleteFeatureImage(oldPostData.featuredImage);
      await appwriteService.deletePost(oldPostData.$id);
      setDeleteLoading(false);
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error while deleting the post : ", error);
    }
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
              {postId ? (
                <img
                  className="max-w-full h-auto rounded-md mb-4"
                  style={{ maxHeight: "200px" }}
                  src={postDateImage}
                />
              ) : null}
              <input
                type="file"
                id="image"
                accept="image/png, image/jpg, image/jpeg, image/webp, image/heic, image/heif,"
                className="w-full p-2 border rounded-md "
                style={{ outlineColor: "var(--accent-7)" }}
                {...register("image", {
                  required: "Image is required.",
                  validate: {
                    checkFileType: (value) =>
                      value[0] &&
                      [
                        "image/png",
                        "image/jpg",
                        "image/jpeg",
                        "image/webp",
                        "image/heic",
                        "image/heif",
                      ].includes(value[0].type)
                        ? true
                        : "Unsupported file format. Supported image format : .png, jpg, .jpeg, .webp, .heic, .heif",
                    checkFileSize: (value) =>
                      value[0] && value[0].size <= 5 * 1024 * 1024 // 5 MB limit
                        ? true
                        : "File size exceeds 5 MB.",
                  },
                })}
                onChange={handleImageChange}
              />
              <Text size="1" color="gray">
                (Please upload the image in 16:9 aspect ratio. File size should
                be less than 5mb.)
              </Text>
              {previewImage && (
                <div className="mt-2">
                  <div>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-w-full h-auto rounded-md"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                  <div className="mt-2">
                    <Button onClick={clearImage} color="red">
                      clear
                    </Button>
                  </div>
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
                wordCount={wordCount}
                setWordCount={setWordCount}
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
                htmlFor="category"
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
                  setValue("category", value, { shouldValidate: true });
                }}
                value={getValues("category")}
              >
                <Select.Trigger
                  placeholder="Select a category"
                  style={{ width: "100%" }}
                />
                <Select.Content
                  style={{ width: "var(--radix-select-trigger-width)" }}
                >
                  {categoriesList.map((category, index) => (
                    <Select.Item key={index} value={category}>
                      {category}
                    </Select.Item>
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
                  checked={getValues("isActive")}
                  onCheckedChange={(checked) => {
                    setValue("isActive", checked, { shouldDirty: true });
                    trigger("isActive"); // This will trigger form validation if needed
                  }}
                />
              </Flex>
              <Text size="2" color="gray" className="mt-1">
                Toggle to set article visibility
              </Text>
            </Box>

            <Flex gap="3">
              {postId ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                  size="3"
                  color="red"
                  radius="large"
                >
                  Delete
                </Button>
              ) : null}
              <Button
                type="submit"
                size="3"
                highContrast
                variant="classic"
                radius="large"
                loading={loading}
              >
                {postId ? "Edit " : "Publish "}Article
              </Button>
            </Flex>
          </form>
        </Flex>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        type="delete"
        confirmText="Delete Account"
        onConfirm={handleDeletePost}
        loading={deleteLoading}
      />
    </div>
  );
};

export default PostForm;
