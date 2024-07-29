import { getPost } from "@/utils/post";

import PostCard from "../PostCard";

import styles from "./index.module.scss";

type Props = { postList: string[] };
const PostCardList = ({ postList }: Props) => {
  console.log(postList);
  return (
    <div className={styles.container}>
      {postList.map(postName => {
        console.log(postName);
        const post = getPost(postName);
        return post ? <PostCard key={postName} post={post} /> : null;
      })}
    </div>
  );
};
export default PostCardList;
