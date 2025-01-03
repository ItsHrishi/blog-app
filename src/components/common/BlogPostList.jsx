import React, { useEffect, useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { Button } from "@radix-ui/themes";
import appwriteService from "../../appwrite/config";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import PostLoading from "../loading/PostLoading";

const BlogPostList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState({
    data: [],
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const maxButtons = 5;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Calculate offset based on current page
      const offset = (currentPage - 1) * postsPerPage;

      const queries = [
        Query.equal("status", true), // Your default query
        Query.limit(postsPerPage),
        Query.offset(offset),
        Query.orderDesc("$createdAt"), // Optional: Order by creation date
      ];

      const response = await appwriteService.getAllPosts(queries);

      if (response) {
        setPosts({
          data: response.documents,
          total: response.total,
        });
      } else {
        // Handle the case where getAllPosts returns false
        console.error("Failed to fetch posts");
        setPosts({
          data: [],
          total: 0,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts({
        data: [],
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(posts.total / postsPerPage);

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

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    // The useEffect will trigger the new data fetch
  };

  if (loading)
    return Array(3)
      .fill(null)
      .map((_, index) => <PostLoading key={index} />);
  else
    return (
      <div className="mt-4">
        <div className="grid grid-cols-1">
          {posts.data.map((post, index) => (
            <div key={post.$id}>
              <BlogPostCard postId={post.$id} />
              {index < posts.data.length - 1 && (
                <hr className="my-4 border-gray-300 dark:border-gray-700" />
              )}
            </div>
          ))}

          {posts.data.length === 0 && (
            <div className="text-center py-4 text-gray-500">No posts found</div>
          )}
        </div>

        {/* Only show pagination if there are posts */}
        {posts.total > 0 && (
          <div className="flex gap-2 mx-full justify-center my-4">
            <Button
              disabled={currentPage === 1}
              variant="surface"
              highContrast
              radius="full"
              onClick={() => handlePageChange(currentPage - 1)}
              size={{
                initial: "2",
                md: "3",
              }}
              style={{
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </Button>

            {pageNumbers.map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "classic" : "soft"}
                highContrast
                radius="full"
                onClick={() => handlePageChange(page)}
                size={{
                  initial: "2",
                  md: "3",
                }}
                style={{ cursor: "pointer" }}
              >
                {page}
              </Button>
            ))}

            <Button
              disabled={currentPage === totalPages}
              variant="surface"
              highContrast
              radius="full"
              onClick={() => handlePageChange(currentPage + 1)}
              size={{
                initial: "2",
                md: "3",
              }}
              style={{
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    );
};

export default BlogPostList;
