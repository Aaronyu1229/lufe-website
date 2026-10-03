import { describe, expect, it } from "vitest";

import { checkConsistency } from "@/i18n/consistency";
import { fingerprint } from "@/i18n/fingerprint";
import { I18N_MODULES } from "@/i18n/registry";

describe("i18n registry", () => {
  for (const mod of I18N_MODULES) {
    it(`${mod.name}: English is up to date with the Chinese`, () => {
      const current = fingerprint(mod.zh);
      expect(
        mod.sourceFingerprint,
        `Chinese copy for "${mod.name}" changed. Update the English in ${mod.enFile} to match, then set its source fingerprint to "${current}".`,
      ).toBe(current);
    });

    it(`${mod.name}: English says no more than the Chinese`, () => {
      expect(checkConsistency(mod.zh, mod.en)).toEqual([]);
    });
  }
});
