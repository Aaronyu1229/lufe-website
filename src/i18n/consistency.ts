import type { Locale } from "./locale";

export function flattenStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(flattenStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(flattenStrings);
  return [];
}

// Single Chinese numerals (第三個月 -> Month 3) may appear as digits in English.
const CHINESE_NUMERALS: Record<string, number> = { 一: 1, 二: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
const WAN_PATTERN = /(\d[\d,]*(?:\.\d+)?)(?:\s*[～~\-–]\s*(\d[\d,]*(?:\.\d+)?))?\s*萬/g;
const YI_PATTERN = /(\d[\d,]*(?:\.\d+)?)\s*億/g;
const CHENG_PATTERN = /(\d[\d,]*(?:\.\d+)?)(?:\s*[-–]\s*(\d[\d,]*(?:\.\d+)?))?\s*成/g;
const ZHE_PATTERN = /(\d[\d,]*(?:\.\d+)?)\s*折/g;
const ROC_YEAR_RANGE_PATTERN = /(^|[^\d])(1\d{2})\s*[-–]\s*(1\d{2})(?=\s*(?:年度|年|開拓))/g;
const ROC_YEAR_PATTERN = /(^|[^\d])(1\d{2})(?=\s*(?:年度|年|\/))/g;
const CHINESE_TEN_MILLION_PATTERN = /一千萬/g;
const CHINESE_ONE_TO_TWO_WAN_PATTERN = /一兩萬/g;
const CHINESE_CHENG_PATTERN = /([一二兩三四五六七八九])成([一二三四五六七八九])?/g;
const ENGLISH_MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};
const ENGLISH_MONTH_NAMES = Object.keys(ENGLISH_MONTHS).join("|");
const ENGLISH_MONTH_DAY_YEAR_PATTERN = new RegExp(`\\b(${ENGLISH_MONTH_NAMES})\\s+(\\d{1,2}),\\s+(\\d{4})`, "gi");
const ENGLISH_MONTH_YEAR_PATTERN = new RegExp(`\\b(${ENGLISH_MONTH_NAMES})\\s+(\\d{4})`, "gi");
const ENGLISH_LARGE_AMOUNT_PATTERN = /(\d[\d,]*(?:\.\d+)?)\s+(billion|million)\b/gi;
const NUMBER_PATTERN = /\d[\d,]*(?:\.\d+)?/g;

export function extractNumbers(text: string, locale: Locale): number[] {
  const numbers: number[] = [];
  let rest = text.replace(/%[\da-f]{2}/gi, "");
  if (locale === "zh") {
    rest = rest.replace(ROC_YEAR_RANGE_PATTERN, (match, prefix: string, start: string, end: string) => {
      const startYear = Number(start);
      const endYear = Number(end);
      if (startYear < 100 || startYear > 199 || endYear < 100 || endYear > 199) return match;
      numbers.push(startYear + 1911, endYear + 1911);
      return `${prefix} `;
    });
    rest = rest.replace(ROC_YEAR_PATTERN, (match, prefix: string, rocYear: string) => {
      const year = Number(rocYear);
      if (year < 100 || year > 199) return match;
      numbers.push(year + 1911);
      return `${prefix} `;
    });
    rest = rest.replace(YI_PATTERN, (_match, value: string) => {
      numbers.push(Math.round(Number(value.replaceAll(",", "")) * 100000000));
      return " ";
    });
    rest = rest.replace(CHINESE_TEN_MILLION_PATTERN, () => {
      numbers.push(10000000);
      return " ";
    });
    rest = rest.replace(CHINESE_ONE_TO_TWO_WAN_PATTERN, () => {
      numbers.push(10000, 20000);
      return " ";
    });
    rest = rest.replace(WAN_PATTERN, (_match, low: string, high: string | undefined) => {
      numbers.push(Math.round(Number(low.replaceAll(",", "")) * 10000));
      if (high) numbers.push(Math.round(Number(high.replaceAll(",", "")) * 10000));
      return " ";
    });
    rest = rest.replace(CHENG_PATTERN, (_match, low: string, high: string | undefined) => {
      const value = Number(low.replaceAll(",", ""));
      numbers.push(value * 10);
      if (high) numbers.push(Number(high.replaceAll(",", "")) * 10);
      return " ";
    });
    rest = rest.replace(CHINESE_CHENG_PATTERN, (_match, whole: string, tenths: string | undefined) => {
      numbers.push(CHINESE_NUMERALS[whole]! * 10 + (tenths ? CHINESE_NUMERALS[tenths]! : 0));
      return " ";
    });
    rest = rest.replace(ZHE_PATTERN, (_match, value: string) => {
      numbers.push(Number(value.replaceAll(",", "")) * 10);
      return " ";
    });
  } else {
    rest = rest.replace(ENGLISH_MONTH_DAY_YEAR_PATTERN, (_match, month: string, day: string, year: string) => {
      numbers.push(ENGLISH_MONTHS[month.toLowerCase()]!, Number(day), Number(year));
      return " ";
    });
    rest = rest.replace(ENGLISH_MONTH_YEAR_PATTERN, (_match, month: string, year: string) => {
      numbers.push(ENGLISH_MONTHS[month.toLowerCase()]!, Number(year));
      return " ";
    });
    rest = rest.replace(ENGLISH_LARGE_AMOUNT_PATTERN, (_match, value: string, unit: string) => {
      const multiplier = unit.toLowerCase() === "billion" ? 1000000000 : 1000000;
      numbers.push(Math.round(Number(value.replaceAll(",", "")) * multiplier));
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
