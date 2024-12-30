import { Container, Text } from "@radix-ui/themes";
import HeroSection from "../blog/HeroSection";
import BlogPostCard from "../common/BlogPostCard";
import BlogPostList from "../common/BlogPostList";
import Post from "./Post";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import PostForm from "../PostForm/PostForm";

const Home = () => {
  return (
    <Container>
      <HeroSection />
      <div className="px-3">
        <Text className=" text-xl md:text-2xl lg:text-2xl font-bold">
          Recent Articles
        </Text>
      </div>
      <BlogPostList />
      {/* <Post /> */}
      {/* <RichTextEditor /> */}
      {/* <PostForm /> */}
      {/* <BlogPostCard /> */}
    </Container>
  );
};

export default Home;
