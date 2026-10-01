import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceExtensions = new Set([".ts", ".tsx", ".css", ".json", ".html"]);
const fullSubset = {
  label: "full",
  charsetPath: resolve(projectRoot, "src/app/fonts/subset-charset.txt"),
  fontPath: resolve(projectRoot, "src/app/fonts/NotoSansTC-subset.woff2"),
};
const criticalSubset = {
  label: "critical",
  charsetPath: resolve(projectRoot, "src/app/fonts/critical-charset.txt"),
  fontPath: resolve(projectRoot, "src/app/fonts/NotoSansTC-critical.woff2"),
};
const homeHeroSourceFile = resolve(projectRoot, "src/components/home/HeroSection.tsx");
const navbarSourceFile = resolve(projectRoot, "src/components/Navbar.tsx");
const chaptersSourceFile = resolve(projectRoot, "src/data/chapters.ts");
const layoutFile = resolve(projectRoot, "src/app/layout.tsx");
const criticalHeroSourceFiles = [
  "src/components/services/ServicesPage.tsx",
  "src/components/about/AboutPage.tsx",
  "src/components/cases/CasesPage.tsx",
  "src/components/services/ChapterPage.tsx",
  "src/components/services/OptimizePage.tsx",
  "src/components/services/MethodologyPage.tsx",
  "src/components/contact/ContactPage.tsx",
  "src/components/assess/AssessWizard.tsx",
  "src/components/field-notes/FieldNotesPage.tsx",
  "src/components/insights/InsightsPage.tsx",
  "src/app/resources/page.tsx",
  "src/app/resources/subsidies/page.tsx",
].map((path) => resolve(projectRoot, path));
const navbarCriticalPatterns = [
  /const navItems[\s\S]*?^\];/gm,
  /<Menu(?:Column|Rail)\s+label="([^"]*)"/gm,
  /<MenuLabel>([^<{]+)<\/MenuLabel>/gm,
  /<button\b(?=[^>]*lufe-mobile-cta)[^>]*>[\s\S]*?<\/button>/gm,
  /function MessageBoxTrigger[\s\S]*$/gm,
  /<Link href="\/" className="flex items-center gap-2\.5 text-\[17px\] font-semibold">[\s\S]*?<\/Link>/gm,
];

function firstScreenSource(filePath) {
  const source = readFileSync(filePath, "utf8");
  const match = source.match(/<section\b(?=[^>]*\blufe-hero\b)[\s\S]*?(?:<ScrollCue\s*\/>|<\/section>)/);
  if (!match) fail(`Font critical subset check failed: could not find the first-screen hero in ${relative(projectRoot, filePath)}.`);
  return match[0];
}

function chapterHeroSource() {
  const source = readFileSync(chaptersSourceFile, "utf8");
  let text = "";
  for (const chapter of source.matchAll(/^  (?:m1|m3|m9|after|na): \{([\s\S]*?)(?=^  (?:m1|m3|m9|after|na): \{|\Z)/gm)) {
    for (const property of ["label", "title", "scene", "heroAction"]) {
      for (const value of chapter[1].matchAll(new RegExp(`^    ${property}: "([^"]*)"`, "gm"))) {
        text += value[1];
      }
    }
  }
  return text;
}

function criticalSourceText(filePath) {
  if (filePath === homeHeroSourceFile) return readFileSync(filePath, "utf8");

  const source = readFileSync(filePath, "utf8");
  if (filePath === navbarSourceFile) {
    let text = "";
    for (const pattern of navbarCriticalPatterns) {
      for (const match of source.matchAll(pattern)) text += match[1] ?? match[0];
    }
    return text;
  }
  if (filePath === chaptersSourceFile) return chapterHeroSource();
  if (criticalHeroSourceFiles.includes(filePath)) return firstScreenSource(filePath);
  return source;
}

function unicodeRange(characters) {
  const ranges = [];
  for (const codePoint of [...characters].map((character) => character.codePointAt(0)).sort((left, right) => left - right)) {
    const previous = ranges.at(-1);
    if (previous && codePoint === previous[1] + 1) previous[1] = codePoint;
    else ranges.push([codePoint, codePoint]);
  }
  return ranges
    .map(([start, end]) => (start === end ? `U+${start.toString(16).toUpperCase().padStart(4, "0")}` : `U+${start.toString(16).toUpperCase().padStart(4, "0")}-${end.toString(16).toUpperCase().padStart(4, "0")}`))
    .join(", ");
}

function printRepairInstructions() {
  console.error(
    "  修法：在專案根目錄執行  npm run font:rebuild  ，然後把 src/app/fonts/ 底下"
  );
  console.error(
    "        產生的字型與字集檔一起 commit。（需要先裝 fontTools：pip3 install fonttools brotli）"
  );
}

function fail(message) {
  console.error(message);
  printRepairInstructions();
  process.exit(1);
}

function readSubsetCharacters(subset) {
  const charset = readFileSync(subset.charsetPath, "utf8");
  const expectedHash = charset.match(/^# sha256=([a-f0-9]{64})$/m)?.[1];

  if (!expectedHash) {
    fail(`Font ${subset.label} subset check failed: no sha256 found in ${relative(projectRoot, subset.charsetPath)}.`);
  }

  const actualHash = createHash("sha256").update(readFileSync(subset.fontPath)).digest("hex");
  if (actualHash !== expectedHash) {
    fail(
      `Font ${subset.label} subset check failed: ${relative(projectRoot, subset.fontPath)} sha256 is ${actualHash}, expected ${expectedHash}.`
    );
  }

  const covered = new Set();
  const allowed = new Set();
  for (const prefix of ["COVERED ", "FALLBACK "]) {
    const line = charset.split(/\r?\n/).find((candidate) => candidate.startsWith(prefix));
    if (!line) {
      fail(`Font ${subset.label} subset check failed: no ${prefix.trim()} line found in ${relative(projectRoot, subset.charsetPath)}.`);
    }

    for (const character of line.slice(prefix.length)) {
      allowed.add(character);
      if (prefix === "COVERED ") covered.add(character);
    }
  }

  return { allowed, covered };
}

function findMissingCharacters(allowed, files, textForFile = (filePath) => readFileSync(filePath, "utf8")) {
  const missing = new Map();

  for (const filePath of files) {
    for (const character of textForFile(filePath)) {
      if (character.codePointAt(0) >= 0x80 && !allowed.has(character) && !missing.has(character)) {
        missing.set(character, relative(projectRoot, filePath));
      }
    }
  }

  return missing;
}

function failForMissingCharacters(label, missing) {
  if (missing.size === 0) return;

  console.error(`Font ${label} subset check failed: ${missing.size} uncovered character(s).`);
  for (const [character, filePath] of [...missing].sort(([left], [right]) =>
    left.codePointAt(0) - right.codePointAt(0)
  )) {
    console.error(`  ${character} U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")} ${filePath}`);
  }
  printRepairInstructions();
  process.exit(1);
}

function findSourceFiles(directory) {
  const files = [];

  function walk(currentDirectory) {
    const entries = readdirSync(currentDirectory, { withFileTypes: true }).sort((left, right) =>
      left.name.localeCompare(right.name)
    );

    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) {
        continue;
      }

      const entryPath = resolve(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.isFile() && sourceExtensions.has(extname(entry.name))) {
        files.push(entryPath);
      }
    }
  }

  walk(directory);
  return files;
}

const scanDirectories = process.argv.slice(2);
if (scanDirectories.length === 0) {
  fail("Usage: node scripts/check-font-subset.mjs <directory> [...directory]");
}

const fullCharacters = readSubsetCharacters(fullSubset);
const criticalCharacters = readSubsetCharacters(criticalSubset);
const allAllowed = new Set([...fullCharacters.allowed, ...criticalCharacters.allowed]);
const fullFiles = [];

for (const scanDirectory of scanDirectories) {
  const directory = resolve(projectRoot, scanDirectory);
  fullFiles.push(...findSourceFiles(directory));
}

failForMissingCharacters("full + critical", findMissingCharacters(allAllowed, fullFiles));

const criticalSourceFiles = [
  homeHeroSourceFile,
  navbarSourceFile,
  ...criticalHeroSourceFiles,
  chaptersSourceFile,
];
failForMissingCharacters(
  criticalSubset.label,
  findMissingCharacters(criticalCharacters.allowed, criticalSourceFiles, criticalSourceText)
);

const overlap = [...fullCharacters.covered].filter((character) => criticalCharacters.covered.has(character));
if (overlap.length > 0) {
  fail(`Font subset check failed: full and critical subsets share ${overlap.length} covered character(s).`);
}

const generatedUnicodeRange = readFileSync(layoutFile, "utf8").match(
  /declarations: \[\{ prop: "unicode-range", value: "([^"]*)" \}\]/
)?.[1];
if (generatedUnicodeRange !== unicodeRange(fullCharacters.covered)) {
  fail("Font full subset check failed: src/app/layout.tsx has an out-of-date unicode-range declaration.");
}

console.log("Font subset check passed: critical + full cover all source characters and have no duplicate glyphs.");
