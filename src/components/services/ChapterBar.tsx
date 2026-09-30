"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CHAPTERS, PHILIPPINES_CHAPTER_KEYS, type PhilippinesChapterKey } from "@/data/chapters";

export function ChapterBar({ current }: { readonly current: PhilippinesChapterKey }) {
  const [atEdge, setAtEdge] = useState(false);
  const currentIndex = PHILIPPINES_CHAPTER_KEYS.indexOf(current);

  useEffect(() => {
    const update = () => setAtEdge(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav aria-label="菲律賓服務章節" className={`lufe-chapter-bar sticky top-[64px] z-20 px-5 py-3 md:px-10 ${atEdge ? "lufe-chapter-bar-edge" : ""}`}>
      <div className="mx-auto flex max-w-[1100px] items-center gap-0 overflow-x-auto md:justify-between">
        {PHILIPPINES_CHAPTER_KEYS.map((key, index) => {
          const chapter = CHAPTERS[key];
          const isCurrent = key === current;
          const isDone = index < currentIndex;
          return (
            <div key={key} className="flex shrink-0 items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className={`lufe-chapter-line ${index <= currentIndex ? "lufe-chapter-line-done" : ""}`} /> : null}
              <Link
                href={chapter.path}
                aria-current={isCurrent ? "page" : undefined}
                className={`lufe-chapter-link ${isCurrent ? "lufe-chapter-link-current" : ""} ${isDone ? "lufe-chapter-link-done" : ""}`}
              >
                <span aria-hidden="true" className="lufe-chapter-dot" />
                <span>{chapter.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
