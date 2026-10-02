import type { ReactNode } from "react";
import Link from "next/link";


type StaticContentBlock =
  | { readonly type: "heading"; readonly level: 2 | 3; readonly text: string }
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "blockquote"; readonly text: string }
  | { readonly type: "list"; readonly ordered: boolean; readonly items: readonly string[] }
  | { readonly type: "table"; readonly headings: readonly string[]; readonly rows: readonly (readonly string[])[] }
  | { readonly type: "divider" };

const TABLE_DIVIDER = /^\|(?:\s*:?-{3,}:?\s*\|)+\s*$/;
const ORDERED_LIST_ITEM = /^\d+\.\s+(.*)$/;
const UNORDERED_LIST_ITEM = /^-\s+(.*)$/;
const INLINE_MARKDOWN = /(\*\*[^*]+\*\*|\[\d+\]|\[[^\]]+\]\([^)]+\)|https?:\/\/[A-Za-z0-9./?=&_%#~:+=-]+)/g;

function parseTableRow(line: string): readonly string[] {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function isBlockStart(line: string): boolean {
  return line.startsWith("## ")
    || line.startsWith("### ")
    || line.startsWith("> ")
    || line === "---"
    || TABLE_DIVIDER.test(line)
    || ORDERED_LIST_ITEM.test(line)
    || UNORDERED_LIST_ITEM.test(line);
}

export function parseStaticMarkdown(content: readonly string[]): readonly StaticContentBlock[] {
  const lines = content.join("\n\n").trim().split(/\r?\n/);
  const blocks: StaticContentBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.slice(4) });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.slice(3) });
      index += 1;
      continue;
    }

    if (line === "---") {
      blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    if (line.startsWith("|") && TABLE_DIVIDER.test(lines[index + 1] ?? "")) {
      const headings = parseTableRow(line);
      const rows: (readonly string[])[] = [];
      index += 2;
      while (lines[index]?.startsWith("|")) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", headings, rows });
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (lines[index]?.startsWith("> ")) {
        quote.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push({ type: "blockquote", text: quote.join(" ") });
      continue;
    }

    const listMatch = ORDERED_LIST_ITEM.exec(line) ?? UNORDERED_LIST_ITEM.exec(line);
    if (listMatch) {
      const ordered = ORDERED_LIST_ITEM.test(line);
      const pattern = ordered ? ORDERED_LIST_ITEM : UNORDERED_LIST_ITEM;
      const items: string[] = [];
      while (true) {
        const item = pattern.exec(lines[index] ?? "");
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

export function renderInlineMarkdown(text: string): ReactNode {
  return text.split(INLINE_MARKDOWN).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="text-tx font-semibold">{part.slice(2, -2)}</strong>;
    }

    const sourceReference = /^\[(\d+)\]$/.exec(part);
    if (sourceReference) {
      const [, sourceId] = sourceReference;
      return (
        <sup key={index}>
          <a
            href={`#source-${sourceId}`}
            data-source-id={`source-${sourceId}`}
            aria-label={`查看出處 ${sourceId}`}
            className="ml-0.5 text-[0.75em] text-gold-d underline decoration-gold/50 underline-offset-2 hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {sourceId}
          </a>
        </sup>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/")
        ? <Link key={index} href={href} className="text-gold-d underline decoration-gold/50 underline-offset-4 hover:text-navy">{label}</Link>
        : <a key={index} href={href} target="_blank" rel="noopener" className="break-all text-gold-d underline decoration-gold/50 underline-offset-4 hover:text-navy">{label}</a>;
    }

    return /^https?:\/\//.test(part)
      ? <a key={index} href={part} target="_blank" rel="noopener" className="break-all text-gold-d underline decoration-gold/50 underline-offset-4 hover:text-navy">{part}</a>
      : part;
  });
}

export function getStaticArticleHeadings(content: readonly string[]): { id: string; text: string }[] {
  let headingNumber = 0;

  return parseStaticMarkdown(content).flatMap((block) => {
    if (block.type !== "heading" || block.level !== 2) return [];
    headingNumber += 1;
    return [{ id: `section-${headingNumber}`, text: block.text.replaceAll("**", "") }];
  });
}

export function StaticArticleContent({
  content,
}: {
  readonly content: readonly string[];
}) {
  const blocks = parseStaticMarkdown(content);
  const numberedBlocks = blocks.map((block, index) => ({
    block,
    index,
    headingNumber: block.type === "heading" && block.level === 2
      ? blocks.slice(0, index + 1).filter((candidate) => candidate.type === "heading" && candidate.level === 2).length
      : undefined,
  }));

  return (
    <div className="text-[17px] leading-[1.95] text-tx">
      {numberedBlocks.flatMap(({ block, index, headingNumber }) => {
        switch (block.type) {
          case "heading": {
            if (block.level !== 2) {
              return <h3 key={index} className="mb-3 mt-8 font-sans text-[21px] font-[650] leading-[1.45] text-tx">{renderInlineMarkdown(block.text)}</h3>;
            }

            if (!headingNumber) return null;
            const heading = <h2 key={index} id={`section-${headingNumber}`} className={`${block.text.startsWith("情境：") ? "mb-6 mt-10 border-l-[3px] border-gold bg-cream px-5 py-4" : "mb-3 mt-10"} scroll-mt-[96px] font-sans text-[26px] font-[650] leading-[1.35] text-tx`}>{renderInlineMarkdown(block.text)}</h2>;
            return heading;
          }
          case "paragraph":
            return <p key={index} className={index === 0 ? "" : "mt-5"}>{renderInlineMarkdown(block.text)}</p>;
          case "blockquote":
            return <blockquote key={index} className="my-6 border-l-2 border-gold pl-5 text-tx2">{renderInlineMarkdown(block.text)}</blockquote>;
          case "list": {
            const listClassName = block.ordered
              ? "my-5 list-decimal space-y-2 pl-6 marker:text-gold-d"
              : "my-5 list-disc space-y-2 pl-6 marker:text-gold-d";
            return block.ordered
              ? <ol key={index} className={listClassName}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInlineMarkdown(item)}</li>)}</ol>
              : <ul key={index} className={listClassName}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInlineMarkdown(item)}</li>)}</ul>;
          }
          case "table":
            return <div key={index} className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-[15px] leading-[1.7]">
                <thead className="bg-cream text-tx">
                  <tr>{block.headings.map((heading, headingIndex) => <th key={headingIndex} className="border border-bd px-3 py-2 font-semibold">{renderInlineMarkdown(heading)}</th>)}</tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border border-bd px-3 py-2 align-top">{renderInlineMarkdown(cell)}</td>)}</tr>)}
                </tbody>
              </table>
            </div>;
          case "divider":
            return <div key={index} className="my-10 h-px w-full bg-bd" />;
        }
      })}
    </div>
  );
}
