export type PostMatter = {
  title: string;
  categories: string;
  tags: string[];
  comments: true;
  draft?: boolean;
  date: string;
  update: string;
  image: string;
};

export type Post = PostMatter & {
  slug: string;
  content: string;
  readingMinutes: number;
  wordCount: number;
};
