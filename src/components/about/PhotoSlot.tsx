import type { CSSProperties } from "react";

import { TieredImage } from "@/components/TieredImage";
import { ABOUT_PHOTO_SLOTS, type AboutPhotoSlotId } from "@/data/aboutPhotoSlots";

type PhotoSlotProps = {
  readonly slotId: AboutPhotoSlotId;
  /** Uploaded photo path when the slot file exists; otherwise the fallback (or nothing) renders. */
  readonly src?: string;
  readonly sizes: string;
  readonly ratioClassName: string;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly imageStyle?: CSSProperties;
  readonly maxTierWidth?: number;
};

const IS_PRODUCTION = process.env.NODE_ENV === "production";

/** Returns the caption that matches what PhotoSlot is showing. */
export function photoSlotCaption(slotId: AboutPhotoSlotId, src?: string): string | undefined {
  const slot = ABOUT_PHOTO_SLOTS[slotId];
  if (src) return "caption" in slot ? slot.caption : undefined;
  return "fallback" in slot ? slot.fallback.caption : undefined;
}

export function photoSlotVisible(slotId: AboutPhotoSlotId, src?: string): boolean {
  return Boolean(src) || "fallback" in ABOUT_PHOTO_SLOTS[slotId] || !IS_PRODUCTION;
}

export function PhotoSlot({ slotId, src, sizes, ratioClassName, className = "", imageClassName = "h-full w-full object-cover", imageStyle, maxTierWidth }: PhotoSlotProps) {
  const slot = ABOUT_PHOTO_SLOTS[slotId];
  const fallback = "fallback" in slot ? slot.fallback : undefined;

  if (src || fallback) {
    return <div data-slot={slotId} className={`${ratioClassName} overflow-hidden ${className}`}>
      <TieredImage src={src ?? fallback?.src} alt={src ? slot.alt : fallback?.alt} maxTierWidth={src ? undefined : maxTierWidth} sizes={sizes} loading="lazy" className={imageClassName} style={imageStyle} />
    </div>;
  }

  if (IS_PRODUCTION) return null;

  return <div data-slot={slotId} className={`${ratioClassName} grid place-items-center border border-dashed border-tx3/50 bg-tx3/5 p-4 text-center ${className}`}>
    <div><p className="text-[13px] font-semibold text-tx2">{slotId}</p><p className="mt-1 text-[12px] leading-[1.6] text-tx3">{slot.hint}</p><p className="mt-1 text-[11px] text-tx3">public/images/about/{slot.file}</p></div>
  </div>;
}
