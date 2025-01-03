import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Container,
  Text,
  Avatar,
  Flex,
  Badge,
  Grid,
} from "@radix-ui/themes";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import appwriteService from "../../appwrite/config.js";
import HeroSliderCardLoading from "../loading/HeroSliderCardLoading.jsx";
import { isoToNormal } from "../../utils/dateConvert.js";
import { useNavigate } from "react-router-dom";

const HeroSliderCard = ({ postId }) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [authorData, setAuthorData] = useState({
    AuthorMetaData: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const post = await appwriteService.getPost(postId);
        if (post) {
          setPostData(post);
          const userMetaData = await appwriteService.getAuthorMetaData(
            post.userId
          );
          if (userMetaData.documents[0])
            setAuthorData((prev) => ({
              ...prev,
              AuthorMetaData: userMetaData.documents[0],
            }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching data :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("authorData ", authorData);
  console.log("postData ", postData);
  // const description = postData.content.replace(/<[^>]*>/g, "");

  if (loading) return <HeroSliderCardLoading />;
  else
    return (
      <Container className="mb-6">
        <Box className="relative overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${postData?.featuredImage ? appwriteService.getArticleImagePreview(postData?.featuredImage) : null})`,
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                <div className="relative z-10">
                  <Grid columns="1 sm:2" className="gap-4">
                    <div>
                      <div className="hidden md:block">
                        {postData?.category ? (
                          <Badge
                            radius="full"
                            className="mb-2"
                            variant="solid"
                            size="2"
                          >
                            {postData?.category}
                          </Badge>
                        ) : null}
                      </div>

                      {/* Title */}
                      <Text
                        onClick={() => {
                          // console.log("clicked id : ", item?.articleId);
                          navigate(`/post/${postId}`);
                        }}
                        className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold line-clamp-2 max-w-4xl cursor-pointer"
                      >
                        {postData?.title}
                      </Text>

                      {/* Description (hidden on mobile) */}
                      <Text className="hidden sm:block text-gray-200 text-sm sm:text-base md:text-lg line-clamp-2 max-w-3xl">
                        <div
                          style={{
                            maxWidth: "100%", // Prevents horizontal overflow
                            maxHeight: "16rem", // Adjust to limit vertical height
                            overflow: "hidden", // Hides overflowing content
                            textOverflow: "ellipsis", // Adds '...' for truncated text
                          }}
                          className="line-clamp-2 text-gray-200 text-sm sm:text-base md:text-base  max-w-3xl"
                        >
                          {postData?.content.replace(/<[^>]*>/g, "")}
                        </div>
                      </Text>
                    </div>

                    {/* Author and Post Info */}
                    <Flex
                      align="start"
                      justify="end"
                      gap="4"
                      direction="column"
                      className="flex-wrap sm:flex-nowrap"
                    >
                      <Flex
                        align="center"
                        gap="2"
                        direction="row"
                        justify="start"
                      >
                        <Avatar
                          size="2"
                          src={
                            authorData?.AuthorMetaData?.profileImage
                              ? appwriteService.getProfileImagePreview(
                                  authorData?.AuthorMetaData?.profileImage
                                )
                              : null
                          }
                          fallback="A"
                          variant="solid"
                          radius="full"
                        />
                        <div>
                          <Text className="text-white text-xs sm:text-base font-medium">
                            {authorData?.AuthorMetaData?.userName}
                          </Text>
                          <Flex className="text-gray-300 text-xs sm:text-sm md:text-base">
                            <Flex align="center" gap="1" className="mr-2">
                              <CalendarIcon />
                              <Text>{isoToNormal(postData?.$createdAt)}</Text>
                            </Flex>
                            <Flex align="center" gap="1">
                              <ClockIcon />
                              <Text>{postData?.readTime} min read</Text>
                            </Flex>
                          </Flex>
                        </div>
                      </Flex>
                    </Flex>
                  </Grid>
                </div>
              </div>
            </div>
          </AspectRatio>
        </Box>
      </Container>
    );
};

export default HeroSliderCard;
