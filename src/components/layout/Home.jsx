import React from "react";
import { Container } from "@radix-ui/themes";
import HeroSection from "../blog/HeroSection";
import BlogPostCard from "../common/BlogPostCard";
import BlogPostList from "../common/BlogPostList";

const Home = () => {
  return (
    <Container>
      <HeroSection />
      {/* <BlogPostCard /> */}
      <BlogPostList />
    </Container>
  );
};

export default Home;
