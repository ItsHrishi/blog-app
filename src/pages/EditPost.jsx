import React from "react";
import PostForm from "../components/PostForm/PostForm";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  return <PostForm postId={id}>EditPost</PostForm>;
};

export default EditPost;
