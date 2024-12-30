import React, { useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { Button } from "@radix-ui/themes";

const posts = {
  data: [
    {
      id: 1,
      title: "Building Scalable Applications with React and Node.js",
      excerpt:
        "Learn how to create enterprise-grade applications using modern web technologies and best practices for scalability. We'll cover everything from setup to deployment.",
      author: {
        name: "Sarah Parker",
        avatar: "https://i.pravatar.cc/150?img=1",
        username: "sparker",
      },
      publishDate: "Dec 27, 2024",
      readTime: "5 min read",
      category: "Programming",
      image:
        "https://t4.ftcdn.net/jpg/06/38/30/11/360_F_638301102_u3KnhyJRD5YgpsKsCvuYqLLBhsmnJ6HE.jpg",
    },
    {
      id: 2,
      title: "Understanding the Basics of Machine Learning",
      excerpt:
        "A beginner's guide to understanding the concepts and techniques behind machine learning, including supervised and unsupervised learning.",
      author: {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=2",
        username: "jdoe",
      },
      publishDate: "Dec 25, 2024",
      readTime: "7 min read",
      category: "Data Science",
      image:
        "https://t4.ftcdn.net/jpg/06/38/30/10/360_F_638301100_KjGexjHZgfkGHBADweVDUsyb68xzAnUi.jpg",
    },
    {
      id: 3,
      title: "Top 10 JavaScript Frameworks in 2024",
      excerpt:
        "Discover the top JavaScript frameworks that are shaping the web development landscape in 2024, and when to use each one.",
      author: {
        name: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
        username: "alicej",
      },
      publishDate: "Dec 20, 2024",
      readTime: "6 min read",
      category: "Web Development",
      image:
        "https://t4.ftcdn.net/jpg/06/38/30/12/360_F_638301104_i8hHC7DmF5BCsUeTYUZWi1MaV37FPUsD.jpg",
    },
    {
      id: 4,
      title: "Mastering CSS Grid and Flexbox",
      excerpt:
        "Learn the differences between CSS Grid and Flexbox, and when to use each layout method to create responsive web designs.",
      author: {
        name: "Chris Lee",
        avatar: "https://i.pravatar.cc/150?img=4",
        username: "clee",
      },
      publishDate: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Design",
      image:
        "https://t4.ftcdn.net/jpg/06/38/30/14/360_F_638301108_urBpblqJPHfpXm9GJxYXEIXg7Bi6tWzF.jpg",
    },
  ],
  currentPage: 3,
  postsPerPage: 5,
  totalPosts: 20,
};

const BlogPostList = () =>
  // { posts = [], postsPerPage=5, totalPages = 12, currentPage = 1 }
  {
    const data = posts.data;
    const totalPages = Math.ceil(posts.totalPosts / posts.postsPerPage);
    const [currentPage, setCurrentPage] = useState(posts.currentPage);
    console.log("totalPages : ", totalPages);

    const maxButtons = 5;

    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxButtons / 2),
        totalPages - maxButtons + 1
      )
    );
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    const handlePageChange = (num) => {
      // api call to the changing number
      setCurrentPage(num);
    };

    return (
      <div className="mt-4">
        <div className="grid grid-cols-1 ">
          {data.map((post, index) => (
            <>
              <BlogPostCard key={post.id} {...post} />
              {index < data.length - 1 && (
                <hr className="my-4 border-gray-300 dark:border-gray-700" />
              )}
            </>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex gap-2 mx-full justify-center my-4">
          <Button
            disabled={currentPage === 1}
            radius="full"
            onClick={() => handlePageChange(currentPage - 1)}
            size={{
              initial: "2",
              md: "3",
            }}
          >
            Prev
          </Button>

          {pageNumbers.map((page) => (
            <Button
              variant={page === currentPage ? "classic" : "soft"}
              highContrast
              radius="full"
              onClick={() => handlePageChange(page)}
              size={{
                initial: "2",
                md: "3",
              }}
            >
              {page}
            </Button>
          ))}

          <Button
            disabled={currentPage === totalPages}
            radius="full"
            onClick={() => handlePageChange(currentPage + 1)}
            size={{
              initial: "2",
              md: "3",
            }}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

export default BlogPostList;
