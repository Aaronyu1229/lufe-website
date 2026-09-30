"use client";

import { type ButtonHTMLAttributes } from "react";

import { useMessageBox } from "@/components/MessageBox";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function ContactButton({ children, onClick, ...props }: Props) {
  const { open } = useMessageBox();

  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) open();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
