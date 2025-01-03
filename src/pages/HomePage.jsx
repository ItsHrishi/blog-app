import { Container, Text } from "@radix-ui/themes";
import BlogPostCard from "../components/common/BlogPostCard";
import BlogPostList from "../components/common/BlogPostList";
import Post from "../components/layout/Post";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import PostForm from "../components/PostForm/PostForm";
import { useSelector } from "react-redux";
import FullPageLoading from "../components/common/FullPageLoading";
import HeroSlider from "../components/blog/HeroSlider";

const HomePage = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state) => state.auth.userData);

  // console.log("auth checking : ", authStatus, authData);
  return (
    <Container>
      <HeroSlider />
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
      {/* <FullPageLoading /> */}
    </Container>
  );
};

export default HomePage;
