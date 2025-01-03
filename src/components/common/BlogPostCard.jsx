import { Avatar, AspectRatio, Text, Badge } from "@radix-ui/themes";
import { ClockIcon } from "@radix-ui/react-icons";
import appwriteService from "./../../appwrite/config";
import React, { useEffect, useState } from "react";
import { isoToNormal } from "../../utils/dateConvert";
import { useNavigate } from "react-router-dom";

const BlogPostCard = ({ postId = "6777bcac000df808a905" }) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [authorData, setAuthorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await appwriteService.getPost(postId);
        if (post) {
          setPostData(post);
          const userMetaData = await appwriteService.getAuthorMetaData(
            post.userId
          );
          if (userMetaData.documents[0])
            setAuthorData(userMetaData.documents[0]);
        }
      } catch (error) {
        console.error("Error while fetching data :", error);
      } finally {
      }
    };
    fetchData();
  }, []);

  // console.log("all data : ", postData, authorData);

  return (
    <div className="my-2 md:my-5 mx-2 xl:w-full sm:mx-auto sm:w-10/12 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-0 rounded-none max-h-[240px] sm:max-h-[220px] md:max-h-[200px]">
      {/* Content Section */}
      {postData?.featuredImage ? (
        // Layout for posts with image
        <div className="h-full grid grid-flow-col gap-2 sm:grid-cols-8 md:grid-cols-10 grid-cols-9">
          <div className=" flex flex-col justify-between sm:col-span-6 md:col-span-8 col-span-6 md:mt-2">
            {/* Author Info Section */}
            <div className="mb-2 flex items-center space-x-2">
              <Avatar
                size="2"
                src={
                  authorData.profileImage
                    ? appwriteService.getProfileImagePreview(
                        authorData?.profileImage
                      )
                    : null
                }
                fallback={authorData.userName ? authorData?.userName[0] : "h"}
                radius="full"
              />
              <div className="flex flex-col sm:flex-row items-start text-xs sm:text-sm">
                <span className="font-medium ">{authorData?.userName}</span>
                <span className=" hidden sm:block mx-1 sm:mx-2 text-gray-500">
                  ·
                </span>
                <span className="text-gray-500">
                  {isoToNormal(postData?.$createdAt)}
                </span>
              </div>
            </div>
            <Text
              onClick={() => {
                navigate(`/post/${postId}`);
              }}
              className="text-lg font-bold mb-1 sm:text-md md:text-xl line-clamp-2 cursor-pointer"
            >
              {postData?.title}
            </Text>
            <Text
              color="gray"
              className="text-xs sm:text-base line-clamp-2 mb-2"
            >
              {postData?.content.replace(/<[^>]*>/g, "")}
            </Text>

            <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base">
              {postData?.category ? (
                <Badge
                  radius="full"
                  variant="outline"
                  size={{ initial: "2", sm: "3" }}
                >
                  {postData?.category}
                </Badge>
              ) : null}

              <div className="flex items-center gap-1 text-gray-500">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{postData?.readTime} min read</span>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2 md:col-span-2 col-span-3 flex justify-center items-center">
            <AspectRatio ratio={3 / 2}>
              <img
                src={
                  postData?.featuredImage
                    ? appwriteService.getArticleImagePreview(
                        postData?.featuredImage
                      )
                    : null
                }
                alt={`${postData?.title} thumbnail`}
                className="w-full h-full object-cover rounded-md max-h-[220px] sm:max-h-[200px] md:max-h-[180px] "
              />
            </AspectRatio>
          </div>
        </div>
      ) : (
        // Layout for posts without image
        // TODO: formatting the without image fromat
        <div className="h-full ">
          <div className=" flex flex-col justify-between ">
            {/* Author Info Section */}
            <div className="mb-2 flex items-center space-x-2">
              <Avatar
                size="2"
                src={
                  authorData.profileImage
                    ? appwriteService.getProfileImagePreview(
                        authorData?.profileImage
                      )
                    : null
                }
                fallback={authorData.userName ? authorData?.userName[0] : "h"}
                radius="full"
              />
              <div className="flex flex-col sm:flex-row items-start text-xs sm:text-sm">
                <span className="font-medium ">{authorData?.userName}</span>
                <span className=" hidden sm:block mx-1 sm:mx-2 text-gray-500">
                  ·
                </span>
                <span className="text-gray-500">
                  {isoToNormal(postData?.$createdAt)}
                </span>
              </div>
            </div>
            <Text
              onClick={() => {
                navigate(`/post/${postId}`);
              }}
              className="text-lg font-bold mb-1 sm:text-md md:text-xl line-clamp-2 cursor-pointer"
            >
              {postData?.title}
            </Text>
            <Text
              color="gray"
              className="text-xs sm:text-base line-clamp-2 mb-2"
            >
              {postData?.content.replace(/<[^>]*>/g, "")}
            </Text>

            <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base">
              {postData?.category ? (
                <Badge
                  radius="full"
                  variant="outline"
                  size={{ initial: "2", sm: "3" }}
                >
                  {postData?.category}
                </Badge>
              ) : null}

              <div className="flex items-center gap-1 text-gray-500">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{postData?.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostCard;
