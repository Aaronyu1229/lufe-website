import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FieldNotesPage } from "@/components/field-notes/FieldNotesPage";
import { ACTIVITIES, FIELD_NOTES } from "@/data/fieldNotes";

const renderPage = () => renderToStaticMarkup(createElement(FieldNotesPage));

describe("FieldNotesPage", () => {
  it("keeps every activity and note in the server markup", () => {
    const markup = renderPage();

    for (const activity of ACTIVITIES) {
      expect(markup).toContain(activity.tag);
      expect(markup).toContain(activity.title);
      expect(markup).toContain(activity.location);
      expect(markup).toContain(activity.date);
      expect(markup).toContain(activity.summary);
    }

    for (const note of FIELD_NOTES) {
      expect(markup).toContain(note.title);
      expect(markup).toContain(note.location);
      expect(markup).toContain(note.date);
      expect(markup).toContain(note.body);
    }

    const pageText = markup.replace(/<[^>]+>/g, "");
    expect(pageText).not.toContain("別人怎麼說我們");
    expect(pageText).not.toContain("一起做事的夥伴網絡");
    expect(pageText).not.toContain("次媒體露出");
    expect(pageText).not.toContain("個合作單位");
    expect(pageText).not.toContain("場活動現場");
    expect(pageText).not.toContain("篇現場筆記");
  });

  it("does not turn field notes into links or render rounded utility classes", () => {
    const markup = renderPage();

    for (const note of FIELD_NOTES) {
      expect(markup).not.toContain(`href=\"/field-notes/${note.id}\"`);
    }
    expect(markup).not.toMatch(/\brounded-(?!full\b)/);
  });
});
