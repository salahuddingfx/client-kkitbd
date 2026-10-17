/* eslint-disable @next/next/no-img-element */
import React from "react";

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

export type StaticImport = StaticImageData | { default: StaticImageData };

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | StaticImport;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoadingComplete?: (img: HTMLImageElement) => void;
}

function resolveSrc(src: string | StaticImport): string {
  if (typeof src === "string") {
    return src;
  }
  if (src && typeof src === "object") {
    if ("default" in src && typeof src.default === "object" && src.default && "src" in src.default) {
      return (src.default as StaticImageData).src;
    }
    if ("src" in src && typeof (src as StaticImageData).src === "string") {
      return (src as StaticImageData).src;
    }
  }
  return "";
}

export default function Image({
  src,
  alt = "",
  width,
  height,
  fill,
  priority,
  loading,
  onLoadingComplete,
  className,
  style,
  onLoad,
  ...props
}: ImageProps) {
  const imageSrc = resolveSrc(src);

  const fillStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }
    : style || {};

  const nativeProps = { ...props };
  delete nativeProps.quality;
  delete nativeProps.placeholder;
  delete nativeProps.blurDataURL;
  delete nativeProps.unoptimized;

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : loading || "lazy"}
      decoding="async"
      className={className}
      style={fillStyle}
      onLoad={(e) => {
        onLoadingComplete?.(e.currentTarget);
        onLoad?.(e);
      }}
      {...nativeProps}
    />
  );
}

export { Image };
