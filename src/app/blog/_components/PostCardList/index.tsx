import { getPost } from "@/utils/post";

import PostCard from "../PostCard";

type Props = { postList: string[] };
const PostCardList = ({ postList }: Props) => {
  console.log(postList);
  return (
    <div>
      {postList.map(postName => {
        console.log(postName);
        const post = getPost(postName);
        return post ? <PostCard key={postName} post={post} /> : null;
      })}
    </div>
  );
};
export default PostCardList;
