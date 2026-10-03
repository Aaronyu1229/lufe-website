import { createHash } from "node:crypto";

/** Short, stable hash of a copy object; English modules store the hash of the Chinese they were translated from. */
export function fingerprint(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}
