import { CommentType, PostType } from "@/types";
import { useLoaderData } from "@tanstack/react-router";

type LoaderDataDefault = {
  comment: CommentType[];
  post: PostType[];
};

const HomePage = () => {
  const { comment, post }: LoaderDataDefault = useLoaderData({ from: "/" });
  console.log(comment);
  console.log(post);

  return <div></div>;
};

export default HomePage;
