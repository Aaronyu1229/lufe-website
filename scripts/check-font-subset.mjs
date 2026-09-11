import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const charsetPath = resolve(projectRoot, "src/app/fonts/subset-charset.txt");
const fontPath = resolve(projectRoot, "src/app/fonts/NotoSansTC-subset.woff2");
const sourceExtensions = new Set([".ts", ".tsx", ".css", ".json", ".html"]);

function printRepairInstructions() {
  console.error(
    "  修法：在專案根目錄執行  npm run font:rebuild  ，然後把 src/app/fonts/ 底下"
  );
  console.error(
    "        兩個檔一起 commit。（需要先裝 fontTools：pip3 install fonttools brotli）"
  );
}

function fail(message) {
  console.error(message);
  printRepairInstructions();
  process.exit(1);
}

function readAllowedCharacters() {
  const charset = readFileSync(charsetPath, "utf8");
  const expectedHash = charset.match(/^# sha256=([a-f0-9]{64})$/m)?.[1];

  if (!expectedHash) {
    fail(`Font subset check failed: no sha256 found in ${relative(projectRoot, charsetPath)}.`);
  }

  const actualHash = createHash("sha256").update(readFileSync(fontPath)).digest("hex");
  if (actualHash !== expectedHash) {
    fail(
      `Font subset check failed: ${relative(projectRoot, fontPath)} sha256 is ${actualHash}, expected ${expectedHash}.`
    );
  }

  const allowed = new Set();
  for (const prefix of ["COVERED ", "FALLBACK "]) {
    const line = charset.split(/\r?\n/).find((candidate) => candidate.startsWith(prefix));
    if (!line) {
      fail(`Font subset check failed: no ${prefix.trim()} line found in ${relative(projectRoot, charsetPath)}.`);
    }

    for (const character of line.slice(prefix.length)) {
      allowed.add(character);
    }
  }

  return allowed;
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

const allowed = readAllowedCharacters();
const missing = new Map();

for (const scanDirectory of scanDirectories) {
  const directory = resolve(projectRoot, scanDirectory);
  for (const filePath of findSourceFiles(directory)) {
    for (const character of readFileSync(filePath, "utf8")) {
      if (character.codePointAt(0) >= 0x80 && !allowed.has(character) && !missing.has(character)) {
        missing.set(character, relative(projectRoot, filePath));
      }
    }
  }
}

if (missing.size > 0) {
  console.error(`Font subset check failed: ${missing.size} uncovered character(s).`);
  for (const [character, filePath] of [...missing].sort(([left], [right]) =>
    left.codePointAt(0) - right.codePointAt(0)
  )) {
    console.error(`  ${character} U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")} ${filePath}`);
  }
  printRepairInstructions();
  process.exit(1);
}

console.log("Font subset check passed: no uncovered non-ASCII characters.");
