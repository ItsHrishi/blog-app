import { Avatar, AspectRatio, Text, Badge } from "@radix-ui/themes";
import { ClockIcon } from "@radix-ui/react-icons";

import React from "react";

const BlogPostCard = () => {
  const post = {
    title: "Building Scalable Applications with React and Node.js",
    excerpt:
      "Learn how to create enterprise-grade applications using modern web technologies and best practices for scalability. We'll cover everything from setup to deployment.",
    author: {
      name: "Sarah Parker",
      avatar: "/api/placeholder/32/32",
      username: "sparker",
    },
    publishDate: "Dec 27, 2024",
    readTime: "5 min read",
    category: "Programming",
    image:
      "https://t4.ftcdn.net/jpg/06/38/30/11/360_F_638301102_u3KnhyJRD5YgpsKsCvuYqLLBhsmnJ6HE.jpg",
  };

  const { title, excerpt, author, publishDate, readTime, category, image } =
    post;

  return (
    <div className="my-2 md:my-5 mx-2 xl:w-full sm:mx-auto sm:w-10/12 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer border-0 rounded-none max-h-[240px] sm:max-h-[220px] md:max-h-[200px]">
      {/* Content Section */}
      {image ? (
        // Layout for posts with image
        <div className="h-full grid grid-flow-col gap-2 sm:grid-cols-8 md:grid-cols-10 grid-cols-9">
          <div className=" flex flex-col justify-between sm:col-span-6 md:col-span-8 col-span-6 md:mt-2">
            {/* Author Info Section */}
            <div className="mb-2 flex items-center space-x-2">
              <Avatar
                size="2"
                src={author.avatar}
                fallback={author.name[0]}
                radius="full"
              />
              <div className="flex flex-col sm:flex-row items-center text-xs sm:text-sm">
                <span className="font-medium">{author.name}</span>
                <span className=" hidden sm:block mx-1 sm:mx-2 text-gray-500">
                  ·
                </span>
                <span className="text-gray-500">{publishDate}</span>
              </div>
            </div>
            <Text className="text-lg font-bold mb-1 sm:text-md md:text-xl line-clamp-2">
              {title}
            </Text>
            <Text
              color="gray"
              className="text-xs sm:text-base line-clamp-2 mb-2"
            >
              {excerpt}
            </Text>
            <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base">
              <Badge
                radius="full"
                variant="outline"
                size={{ initial: "2", sm: "3" }}
              >
                {category}
              </Badge>
              <div className="flex items-center gap-1.5 text-gray-500">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2 md:col-span-2 col-span-3 flex justify-center items-center">
            <AspectRatio ratio={3 / 2}>
              <img
                src={image}
                alt={`${title} thumbnail`}
                className="w-full h-full object-cover rounded-md max-h-[220px] sm:max-h-[200px] md:max-h-[180px] "
              />
            </AspectRatio>
          </div>
        </div>
      ) : (
        // Layout for posts without image
        // TODO: formatting the without image fromat
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
              {category}
            </span>
            <span className="text-gray-500">{readTime}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostCard;

//     {
//       title: "The Future of JavaScript: What's Coming in 2025",
//       excerpt:
//         "Exploring the upcoming features in JavaScript and how they will change the way we write code. From pattern matching to decorators, get ready for the future.",
//       author: {
//         name: "John Doe",
//         avatar: "/api/placeholder/32/32",
//         username: "jdoe",
//       },
//       publishDate: "Dec 26, 2024",
//       readTime: "4 min read",
//       category: "JavaScript",
//       // No image for this post
//     },
//   ];
