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
  sourceFiles: [
    resolve(projectRoot, "src/components/home/HeroSection.tsx"),
    resolve(projectRoot, "src/components/Navbar.tsx"),
    resolve(projectRoot, "src/i18n/zh/navbar-critical.ts"),
  ],
};
const navbarCriticalPatterns = [
  /const navItems[\s\S]*?^\];/gm,
  /<Menu(?:Column|Rail)\s+label="([^"]*)"/gm,
  /<MenuLabel>([^<{]+)<\/MenuLabel>/gm,
  /<button\b(?=[^>]*lufe-mobile-cta)[^>]*>[\s\S]*?<\/button>/gm,
  /function MessageBoxTrigger[\s\S]*$/gm,
  /<Link href="\/" className="flex items-center gap-2\.5 text-\[17px\] font-semibold">[\s\S]*?<\/Link>/gm,
];

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

function readAllowedCharacters(subset) {
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

  const allowed = new Set();
  for (const prefix of ["COVERED ", "FALLBACK "]) {
    const line = charset.split(/\r?\n/).find((candidate) => candidate.startsWith(prefix));
    if (!line) {
      fail(`Font ${subset.label} subset check failed: no ${prefix.trim()} line found in ${relative(projectRoot, subset.charsetPath)}.`);
    }

    for (const character of line.slice(prefix.length)) {
      allowed.add(character);
    }
  }

  return allowed;
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

function criticalSourceText(filePath) {
  const source = readFileSync(filePath, "utf8");
  if (filePath.endsWith("HeroSection.tsx")) return source;
  if (filePath.endsWith("navbar-critical.ts")) return [...source]
    .filter((character) => character.codePointAt(0) >= 0x80)
    .join("");

  let text = "";
  for (const pattern of navbarCriticalPatterns) {
    for (const match of source.matchAll(pattern)) {
      text += match[1] ?? match[0];
    }
  }
  return text;
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

const fullAllowed = readAllowedCharacters(fullSubset);
const fullFiles = [];

for (const scanDirectory of scanDirectories) {
  const directory = resolve(projectRoot, scanDirectory);
  fullFiles.push(...findSourceFiles(directory));
}

failForMissingCharacters(fullSubset.label, findMissingCharacters(fullAllowed, fullFiles));

const criticalAllowed = readAllowedCharacters(criticalSubset);
failForMissingCharacters(
  criticalSubset.label,
  findMissingCharacters(criticalAllowed, criticalSubset.sourceFiles, criticalSourceText)
);

console.log("Font subset check passed: full and critical subsets cover their source characters.");
