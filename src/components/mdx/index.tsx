import dynamic from "next/dynamic";
import Link from "next/link";

import MdxImage from "./image";
import Toc from "./Toc";

export const components = {
  Toc,
  Dynamic: dynamic(() => import("./dynamic")),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => <strong className="custom-strong" {...props} />,
  wrapper: (props: React.ComponentPropsWithoutRef<"div">) => {
    return <div id="mdx-layout">{props.children}</div>;
  },
  Link,
  Image: MdxImage,
};
