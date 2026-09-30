import Link from "next/link";

import { CHAPTERS, PHILIPPINES_CHAPTER_KEYS, type PhilippinesChapterKey } from "@/data/chapters";

export function ChapterBar({ current }: { readonly current: PhilippinesChapterKey }) {
  return (
    <nav aria-label="菲律賓服務章節" className="sticky top-[74px] z-20 border-y border-bd bg-white px-5 py-3 md:px-10">
      <div className="mx-auto flex max-w-[1100px] items-center gap-2 overflow-x-auto md:justify-between">
        {PHILIPPINES_CHAPTER_KEYS.map((key, index) => {
          const chapter = CHAPTERS[key];
          const isCurrent = key === current;
          return (
            <div key={key} className="flex shrink-0 items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className="h-px w-5 bg-bd2 md:w-10" /> : null}
              <Link
                href={chapter.path}
                aria-current={isCurrent ? "page" : undefined}
                className={`border px-3 py-2 text-[13px] leading-[1.35] ${
                  isCurrent
                    ? "border-navy bg-navy font-semibold text-white"
                    : "border-bd bg-white text-tx2 hover:border-gold hover:text-tx"
                }`}
              >
                {chapter.label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
