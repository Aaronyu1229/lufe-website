import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p", "br", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em",
  "b", "i", "u", "blockquote", "code", "pre", "hr", "img", "a", "table",
  "thead", "tbody", "tr", "th", "td", "figure", "figcaption", "div", "span",
];

export const sanitizeArticleHtml = (html: string): string => sanitizeHtml(html, {
  allowedTags,
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    "*": ["id"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    a: ["http", "https", "mailto"],
    img: ["http", "https"],
  },
  allowedSchemesAppliedToAttributes: ["href", "src"],
  disallowedTagsMode: "discard",
});
