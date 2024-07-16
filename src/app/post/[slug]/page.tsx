import { MDXRemote, MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import RemarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

import { components } from "@/components/mdx";
import PostTemplate from "@/components/templates/post";
import { getAllPostName, getPost } from "@/utils/post";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getPost(slug);

  const options: MDXRemoteOptions = {
    disableImports: true,
    parseFrontmatter: true,
    vfileDataIntoScope: ["toc"], // the "remark-flexible-toc" plugin produces vfile.data.toc
    mdxOptions: {
      remarkPlugins: [RemarkFlexibleToc, remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
        [rehypePrettyCode, { theme: "rose-pine" }],
      ],
    },
  };

  if (!post) return null;
  return (
    <PostTemplate {...post}>
      <MDXRemote source={post.content} options={options} components={components} />
    </PostTemplate>
  );
}

export function generateStaticParams() {
  const postNameList = getAllPostName();

  return postNameList.map(post => ({
    slug: post,
  }));
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  console.log(params);
  return {};
}
