import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const TAIPEI_OFFSET_MS = 8 * 60 * 60 * 1000;
const SCHEDULED_DAYS = new Set([2, 4, 6]);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const articlesPath = path.resolve(scriptDirectory, "../src/data/articles.ts");

function propertyName(property) {
  return ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : undefined;
}

function stringProperty(article, name) {
  const property = article.properties.find((candidate) =>
    ts.isPropertyAssignment(candidate) && propertyName(candidate) === name,
  );
  return property && ts.isStringLiteral(property.initializer) ? property.initializer.text : undefined;
}

function unwrapExpression(expression) {
  let current = expression;
  while (ts.isAsExpression(current) || ts.isParenthesizedExpression(current) || ts.isSatisfiesExpression(current)) {
    current = current.expression;
  }
  return current;
}

function readArticles() {
  const source = ts.createSourceFile(articlesPath, readFileSync(articlesPath, "utf8"), ts.ScriptTarget.Latest, true);
  const articlesDeclaration = source.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => statement.declarationList.declarations)
    .find((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === "articles");

  const initializer = articlesDeclaration?.initializer && unwrapExpression(articlesDeclaration.initializer);
  if (!initializer || !ts.isArrayLiteralExpression(initializer)) {
    throw new Error("Could not read the articles array from src/data/articles.ts");
  }

  return initializer.elements
    .filter(ts.isObjectLiteralExpression)
    .map((article) => ({
      slug: stringProperty(article, "slug"),
      publishAt: stringProperty(article, "publishAt"),
    }))
    .filter((article) => article.slug);
}

function isPublished(article, now) {
  return !article.publishAt || new Date(article.publishAt).getTime() <= now.getTime();
}

function toTaipeiIso(date) {
  const taipei = new Date(date.getTime() + TAIPEI_OFFSET_MS);
  const datePart = [taipei.getUTCFullYear(), String(taipei.getUTCMonth() + 1).padStart(2, "0"), String(taipei.getUTCDate()).padStart(2, "0")].join("-");
  const timePart = [taipei.getUTCHours(), taipei.getUTCMinutes(), taipei.getUTCSeconds()]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
  return `${datePart}T${timePart}+08:00`;
}

function nextAvailableSlots(articles, now) {
  const occupiedSlots = new Set(
    articles
      .flatMap((article) => article.publishAt ? [new Date(article.publishAt).getTime()] : [])
      .filter(Number.isFinite),
  );
  const taipeiNow = new Date(now.getTime() + TAIPEI_OFFSET_MS);
  const candidate = new Date(Date.UTC(taipeiNow.getUTCFullYear(), taipeiNow.getUTCMonth(), taipeiNow.getUTCDate(), 1));
  const slots = [];

  while (slots.length < 3) {
    if (SCHEDULED_DAYS.has(candidate.getUTCDay()) && candidate.getTime() > now.getTime() && !occupiedSlots.has(candidate.getTime())) {
      slots.push(toTaipeiIso(candidate));
    }
    candidate.setUTCDate(candidate.getUTCDate() + 1);
  }

  return slots;
}

const now = new Date();
const articles = readArticles();
const slots = nextAvailableSlots(articles, now);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(slots));
} else {
  for (const article of articles) {
    console.log(`${article.slug}\t${article.publishAt ?? "—"}\t${isPublished(article, now) ? "已發布" : "排程中"}`);
  }
  console.log("\n下一個空檔：");
  for (const slot of slots) console.log(slot);
}
