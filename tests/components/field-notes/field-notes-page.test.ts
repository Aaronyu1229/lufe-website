import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FieldNotesPage } from "@/components/field-notes/FieldNotesPage";
import { ACTIVITIES, FIELD_NOTES, MEDIA_MENTIONS, PARTNER_LOGOS } from "@/data/fieldNotes";

const renderPage = () => renderToStaticMarkup(createElement(FieldNotesPage));

describe("FieldNotesPage", () => {
  it("keeps every activity, note, mention, and partner in the server markup", () => {
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

    for (const mention of MEDIA_MENTIONS) {
      expect(markup).toContain(mention.outlet);
      expect(markup).toContain(mention.title);
      expect(markup).toContain(mention.date);
    }

    for (const partner of PARTNER_LOGOS) {
      expect(markup).toContain(partner.name);
      expect(markup).toContain(partner.type);
    }
  });

  it("does not turn field notes into links or render rounded utility classes", () => {
    const markup = renderPage();

    for (const note of FIELD_NOTES) {
      expect(markup).not.toContain(`href=\"/field-notes/${note.id}\"`);
    }
    expect(markup).not.toMatch(/\brounded-(?!full\b)/);
  });
});
