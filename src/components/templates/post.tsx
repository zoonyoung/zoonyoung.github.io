import dayjs from "dayjs";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";

import Chip from "@/components/Chip";
import Giscus from "@/components/Giscus";
import { PostMatter } from "@/types";

import styles from "./post.module.scss";

type Props = PostMatter & { children: React.ReactNode };

const PostTemplate = ({ title, image, tags, draft, date, children }: Props) => {
  return (
    <article className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.day}>
          <AiOutlineCalendar />
          {dayjs(date).locale("ko").format("YY-MM-DD")}
        </p>
      </div>
      <Image className={styles.thumbnail} src={image} alt="main" width={715} height={400} />
      <div className="post-content">{draft ? <div>Not yet published</div> : children}</div>
      <div className={styles.categoryBox}>
        {tags.map(tag => (
          <Chip key={tag} title={tag} />
        ))}
      </div>
      <Giscus />
    </article>
  );
};
export default PostTemplate;
