import { ABOUT_PHOTO_SLOTS, type AboutPhotoSlot, type AboutPhotoSlotId } from "@/data/aboutPhotoSlots";

export const ABOUT_PHOTO_SLOTS_EN = {
  "PHOTO-SLOT-01": {
    ...ABOUT_PHOTO_SLOTS["PHOTO-SLOT-01"],
    alt: "An early Jumping Freight office",
    caption: "Jumping Freight began here 43 years ago",
    hint: "An authentic early photo from Jumping Freight: its first office, an old sign, handwritten customs declarations, or an early warehouse. If none is available, use a current photo from Jumping Freight customs clearance or warehouse operations.",
    fallback: { ...ABOUT_PHOTO_SLOTS["PHOTO-SLOT-01"].fallback, alt: "Container terminal—the everyday work of Jumping Freight for 43 years", caption: "Container terminal—the everyday work of Jumping Freight for 43 years" },
  },
  "PHOTO-SLOT-03": {
    ...ABOUT_PHOTO_SLOTS["PHOTO-SLOT-03"],
    alt: "What happens after goods arrive overseas",
    caption: "The goods arrived. What follows is where the work begins.",
    hint: "An authentic scene after arrival: Taiwanese products on overseas shelves, a local warehouse, or container unloading. Do not show identifiable client brands.",
    fallback: { ...ABOUT_PHOTO_SLOTS["PHOTO-SLOT-03"].fallback, alt: "A compass on a world map—planned exploration", caption: "A compass on a world map—planned exploration" },
  },
  "PHOTO-SLOT-05A": {
    ...ABOUT_PHOTO_SLOTS["PHOTO-SLOT-05A"],
    alt: "The founder at Jumping Freight",
    hint: "The founder at a Jumping Freight office, warehouse, or customs counter, or a group photo with the Jumping Freight team.",
  },
  "PHOTO-SLOT-05B": {
    ...ABOUT_PHOTO_SLOTS["PHOTO-SLOT-05B"],
    alt: "Philippine partners at work",
    hint: "A partner’s English classroom or bubble-tea shop. Do not show store signage; obtain permission for any identifiable faces.",
  },
  "PHOTO-SLOT-05C": {
    ...ABOUT_PHOTO_SLOTS["PHOTO-SLOT-05C"],
    alt: "North America team at a trade show",
    hint: "A North American trade-show booth or buyer meeting. Do not show client brands.",
  },
} as const satisfies Record<AboutPhotoSlotId, AboutPhotoSlot>;
