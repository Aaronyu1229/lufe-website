import type { ComponentProps } from "react";

import { imageTierSrcSet } from "@/lib/image-tiers";

interface TieredImageProps extends ComponentProps<"img"> {
  readonly maxTierWidth?: number;
  readonly sizes: string;
}

/** Native image element for the WebP tiers committed with the application. */
export function TieredImage({ alt, maxTierWidth, sizes, src, ...props }: TieredImageProps) {
  const source = typeof src === "string" ? src : "";

  return (
    // The tiers are built ahead of time; do not route these through next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      src={source}
      srcSet={imageTierSrcSet(source, maxTierWidth)}
      sizes={sizes}
      loading={props.loading ?? "lazy"}
      decoding={props.decoding ?? "async"}
    />
  );
}
