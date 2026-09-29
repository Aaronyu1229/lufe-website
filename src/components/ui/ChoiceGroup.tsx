"use client";

import { type ReactNode } from "react";

export interface ChoiceOption {
  value: string;
  label: ReactNode;
}

export interface ChoiceGroupProps {
  options: ChoiceOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export function ChoiceGroup({ options, value, onChange, label, className }: ChoiceGroupProps) {
  return <div role="group" aria-label={label} className={`flex flex-wrap gap-2 ${className ?? ""}`}>
    {options.map((option) => {
      const selected = option.value === value;
      return <button
        key={option.value}
        type="button"
        aria-pressed={selected}
        onClick={() => onChange(option.value)}
        className={`cursor-pointer border px-4 py-2.5 text-[15px] outline-none transition-[transform,background-color,color,border-color] active:scale-95 focus-visible:ring-2 focus-visible:ring-sky ${selected ? "border-navy bg-navy text-white" : "border-black/[.14] bg-white text-tx"}`}
      >
        {option.label}
      </button>;
    })}
  </div>;
}
