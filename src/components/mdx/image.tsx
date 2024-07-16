import Image, { type ImageProps } from "next/image";

export default function MdxImage(props: ImageProps) {
  const { alt, width = "300", height = "300", ...rest } = props;
  return <Image alt={alt} width={width} height={height} {...rest} />;
}
