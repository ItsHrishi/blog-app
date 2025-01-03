import React, { useEffect, useState } from "react";
import {
  Container,
  Text,
  Avatar,
  Flex,
  Card,
  Button,
  Box,
} from "@radix-ui/themes";
import {
  CalendarIcon,
  ClockIcon,
  BookmarkIcon,
  Share2Icon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import parse from "html-react-parser";
import "./post-styles.css";
import { isoToNormal } from "../../utils/dateConvert.js";
import FullPageLoading from "../common/FullPageLoading.jsx";
import Modal from "../common/Modal.jsx";

const Post = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  // const [authorData, setAuthorData] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [authorMetaData, setAuthorMetaData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [images, setImages] = useState({
    profileImage: null,
    featureImage: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  // console.log("Id : ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!id) {
          navigate("/"); // Redirect to home if no ID
          return;
        }

        const postData = await appwriteService.getPost(id);
        if (!postData) {
          throw new Error("Post not found");
        }
        setPost(postData);

        const writerMetaData = await appwriteService.getAuthorMetaData(
          postData.userId
        );
        setAuthorMetaData(writerMetaData.documents[0]);
        // console.log("writer meta data : ", writerMetaData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching post:", error);
        navigate("/"); // Or show error state
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    if (post?.featuredImage)
      setImages((prev) => ({
        ...prev,
        featureImage: appwriteService.getArticleImagePreview(
          post?.featuredImage
        ),
      }));

    if (authorMetaData?.profileImage)
      setImages((prev) => ({
        ...prev,
        profileImage: appwriteService.getProfileImagePreview(
          authorMetaData?.profileImage
        ),
      }));

    setIsAuthor(post && userData ? post.userId === userData.$id : false);
  }, [post, authorMetaData]);

  const handleDeletePost = async () => {
    try {
      setDeleteLoading(true);
      if (post.featuredImage)
        await appwriteService.deleteFeatureImage(post.featuredImage);
      await appwriteService.deletePost(post.$id);
      setDeleteLoading(false);
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error while deleting the post : ", error);
    }
  };

  // console.log("checking post : ", post);
  // console.log("checking authorMetaData : ", authorMetaData);

  if (loading) return <FullPageLoading />;
  else
    return (
      <article className="mt-2">
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
        {/* Article Header */}
        <Container className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Flex direction="column" gap="4">
              {images.featureImage ? (
                <img
                  src={images.featureImage}
                  alt="Featured"
                  className="w-full h-full object-cover"
                  style={{
                    aspectRatio: "16/9",
                  }}
                />
              ) : null}
              {/* Category */}
              <div className="flex  justify-between items-center">
                <Text size="2" className="text-xs sm:text-sm md:text-base">
                  {post?.category}
                </Text>
                {isAuthor ? (
                  <Flex className="space-x-2">
                    <Button
                      onClick={() => {
                        navigate(`/edit-post/${post?.$id}`);
                      }}
                      variant="soft"
                      size="2"
                    >
                      <Pencil2Icon width="16" height="16" />
                      <Box display={{ initial: "none", sm: "block" }} ml="1">
                        Edit
                      </Box>
                    </Button>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      variant="soft"
                      size="2"
                    >
                      <TrashIcon width="16" height="16" />
                      <Box display={{ initial: "none", sm: "block" }} ml="1">
                        Delete
                      </Box>
                    </Button>
                  </Flex>
                ) : null}
              </div>
              {/* Title */}
              <Text
                size="8"
                className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold max-w-4xl"
              >
                {post?.title}
              </Text>
              {/* Author Info and Article Meta */}
              <Flex
                direction={{ initial: "column", xs: "row" }}
                justify="between"
                align={{ sm: "center" }}
                gap="4"
                mt="4"
                width="100%"
              >
                {/* Author and Article Info */}
                <Flex
                  direction={{ initial: "column", xs: "row" }}
                  align={{ initial: "start", xs: "center" }}
                  gap="4"
                  grow="1"
                >
                  {/* Author Info */}
                  <Flex align="center" gap="2">
                    <Avatar
                      src={images.profileImage}
                      fallback="SJ"
                      size="3"
                      radius="full"
                      variant="soft"
                    />
                    <Box>
                      <Text weight="medium">{authorMetaData?.userName}</Text>
                      <Flex gap="3" mt="1">
                        <Flex align="center" gap="1">
                          <CalendarIcon />
                          <Text size="2" color="gray">
                            {isoToNormal(post?.$createdAt)}
                            {/* {post?.$createdAt} */}
                          </Text>
                        </Flex>
                        <Flex align="center" gap="1">
                          <ClockIcon />
                          <Text size="2" color="gray">
                            {`${post?.readTime} min read`}
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>

                {/* Share and Save Buttons */}
                {/* //TODO: need to configure the share and send */}
                <Flex
                  gap="2"
                  align="center"
                  justify={{ initial: "start", sm: "end" }}
                  width={{ initial: "100%", xs: "auto" }}
                >
                  <Button variant="soft" size="2">
                    <Share2Icon width="16" height="16" />
                    <Box display={{ initial: "none", sm: "block" }} ml="1">
                      Share
                    </Box>
                  </Button>
                  <Button variant="soft" size="2">
                    <BookmarkIcon width="16" height="16" />
                    <Box display={{ initial: "none", sm: "block" }} ml="1">
                      Save
                    </Box>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </div>

          {/* Main Article Content */}
          <div className="tinymce-content font-[Roboto] text-base leading-relaxed">
            {parse(String(post?.content))}
            {/* {console.log(post?.content)} */}
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Flex direction="column" gap="4">
              {/* Author Bio */}
              <Card className="mb-4">
                <Flex>
                  <Avatar
                    size="4"
                    src={images.profileImage}
                    fallback={
                      authorMetaData ? authorMetaData?.userName[0] : "h"
                    }
                    radius="full"
                    className="mr-4"
                  />
                  <Flex direction="column" gap="2">
                    <Text weight="medium">{authorMetaData?.userName}</Text>
                    <Text size="2" color="gray">
                      {authorMetaData?.bio}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </div>
        </Container>
      </article>
    );
};

export default Post;
