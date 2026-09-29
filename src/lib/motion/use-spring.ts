"use client";

import { useEffect, useState } from "react";

import { spring, type Spring, type SpringConfig } from "./spring";

/** React bridge for the framework-agnostic spring. */
export function useSpring(initialValue: number, config?: SpringConfig): Spring {
  const [, render] = useState(0);
  const [instance] = useState(() => spring(initialValue, () => render((count) => count + 1), config));

  useEffect(() => () => instance.stop(), [instance]);
  return instance;
}
