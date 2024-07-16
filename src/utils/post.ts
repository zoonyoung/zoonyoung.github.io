import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { POST_BASE_PATH } from "@/constant";
import { Post, PostMatter } from "@/types";

export type PostNameList = string[];

const POSTS_PATH = path.join(process.cwd(), POST_BASE_PATH);

const parsePost = (postPath: string): Post | undefined => {
  try {
    const file = fs.readFileSync(postPath, { encoding: "utf8" });
    const { content, data } = matter(file);
    const grayMatter = data as PostMatter;

    if (grayMatter.draft) {
      return;
    }

    return {
      ...grayMatter,
      tags: grayMatter.tags.filter(Boolean),
      content,
      slug: postPath.split("posts/")[1].replace(".mdx", ""),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/gu).length,
    };
  } catch (e) {
    console.error(e);
  }
};

export const getAllPostName = (): PostNameList => {
  const postFiles = fs.readdirSync(POSTS_PATH);
  return postFiles.map(file => file.replace(".mdx", ""));
};

export const getPost = (name: string): Post | undefined => {
  const postPath = path.join(POSTS_PATH, `/${name}.mdx`);
  try {
    return parsePost(postPath);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
