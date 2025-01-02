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
} from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import parse from "html-react-parser";

const Post = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [authorData, setAuthorData] = useState({});
  const [authorMetaData, setAuthorMetaData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.$id === userData.$id : false;

  console.log("Id : ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (!id) {
        //   navigate("/"); // Redirect to home if no ID
        //   return;
        // }

        const postData = await appwriteService.getPost(id);
        if (!postData) {
          throw new Error("Post not found");
        }
        setPost(postData);

        const writerData = await appwriteService.getAuthorData(postData.$id);
        if (!writerData) {
          throw new Error("Author data not found");
        }
        setAuthorData(writerData);

        const writerMetaData = await appwriteService.getAuthorMetaData(
          postData.$id
        );
        setAuthorMetaData(writerMetaData);
        console.log("writer meta data : ", writerMetaData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/"); // Or show error state
      }
    };

    fetchData();
  }, [id, navigate]);

  console.log("author data : ", authorData);
  console.log("post data : ", post);

  const category = "Technology";
  const title =
    " Understanding the Future of Artificial Intelligence: A Comprehensive Guide";
  const content = "";
  const profilePhoto =
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453";
  const publishDate = "Dec 27, 2024";
  const readTime = " 8 min read";
  const authorName = "Sarah Johnson";
  const authorBio =
    "AI Researcher and Tech Writer with over 10 years of experience in machine learning and artificial intelligence. Previously worked at Google AI and DeepMind.";

  return (
    <article className="mt-8">
      {/* Article Header */}
      <Container className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Flex direction="column" gap="4">
            {/* Category */}
            <Text size="2" className="text-xs sm:text-sm md:text-base">
              {post?.category}
            </Text>
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
                    src={profilePhoto}
                    fallback="SJ"
                    size="3"
                    radius="full"
                    variant="soft"
                  />
                  <Box>
                    <Text weight="medium">{authorData?.name}</Text>
                    <Flex gap="3" mt="1">
                      <Flex align="center" gap="1">
                        <CalendarIcon />
                        <Text size="2" color="gray">
                          {publishDate}
                        </Text>
                      </Flex>
                      <Flex align="center" gap="1">
                        <ClockIcon />
                        <Text size="2" color="gray">
                          {readTime}
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
        <div className="prose prose-lg dark:prose-invert max-w-none">
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
                  size="5"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
                  fallback="A"
                  radius="full"
                  className="mr-4"
                />
                <Flex direction="column" gap="2">
                  <Text weight="medium">{authorData?.name}</Text>
                  <Text size="2" color="gray">
                    {authorBio}
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
