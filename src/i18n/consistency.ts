import type { Locale } from "./locale";

export function flattenStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(flattenStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(flattenStrings);
  return [];
}

// Single Chinese numerals (第三個月 -> Month 3) may appear as digits in English.
const CHINESE_NUMERALS: Record<string, number> = { 一: 1, 二: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
const WAN_PATTERN = /(\d+(?:\.\d+)?)(?:\s*[～~\-–]\s*(\d+(?:\.\d+)?))?\s*萬/g;
const NUMBER_PATTERN = /\d[\d,]*(?:\.\d+)?/g;

export function extractNumbers(text: string, locale: Locale): number[] {
  const numbers: number[] = [];
  let rest = text;
  if (locale === "zh") {
    rest = text.replace(WAN_PATTERN, (_match, low: string, high: string | undefined) => {
      numbers.push(Math.round(Number(low) * 10000));
      if (high) numbers.push(Math.round(Number(high) * 10000));
      return " ";
    });
  }
  for (const raw of rest.match(NUMBER_PATTERN) ?? []) numbers.push(Number(raw.replaceAll(",", "")));
  return numbers;
}

function chineseNumeralValues(text: string): number[] {
  return [...text].flatMap((char) => (char in CHINESE_NUMERALS ? [CHINESE_NUMERALS[char]] : []));
}

export function hedgeCount(text: string, locale: Locale): number {
  const pattern = locale === "zh" ? /預計/g : /\b(expected|estimated|planned)\b/gi;
  return text.match(pattern)?.length ?? 0;
}

export function checkConsistency(zh: unknown, en: unknown): string[] {
  const zhText = flattenStrings(zh).join("\n");
  const enText = flattenStrings(en).join("\n");
  const problems: string[] = [];

  const zhNumbers = new Set(extractNumbers(zhText, "zh"));
  const enNumbers = new Set(extractNumbers(enText, "en"));
  const allowed = new Set([...zhNumbers, ...chineseNumeralValues(zhText)]);
  for (const n of enNumbers) if (!allowed.has(n)) problems.push(`English adds number ${n} that the Chinese does not have`);
  for (const n of zhNumbers) if (!enNumbers.has(n)) problems.push(`English drops number ${n} from the Chinese`);

  const zhHedges = hedgeCount(zhText, "zh");
  const enHedges = hedgeCount(enText, "en");
  if (enHedges < zhHedges) problems.push(`English has ${enHedges} hedge words (expected/estimated/planned) but Chinese has ${zhHedges} 預計`);

  const han = enText.match(/\p{Script=Han}+/gu);
  if (han) problems.push(`English still contains Han characters: ${han.join(" ")}`);

  return problems;
}
