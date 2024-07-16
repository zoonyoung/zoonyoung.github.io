import { getAllPostName } from "@/utils/post";

import PostCardList from "./_components/PostCardList";

const BlogPage = () => {
  const postList = getAllPostName();
  console.log(postList);
  return (
    <div>
      <PostCardList postList={postList} />
    </div>
  );
};

export default BlogPage;
