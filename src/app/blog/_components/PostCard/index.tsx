"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";

import { Post } from "@/types";

import styles from "./index.module.scss";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className={styles.container}>
        <Image className={styles.image} src={post.image} width={250} height={140} alt="post" priority />
        <h1>{post.title}</h1>
        <div className={styles.subBox}>
          <small>
            <AiOutlineCalendar /> {post?.date}
          </small>
          <small>
            <AiOutlineClockCircle />
            {post.readingMinutes}분
          </small>
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
