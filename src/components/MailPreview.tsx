"use client";

import { useEffect, useRef } from "react";

export function MailPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enter = window.setTimeout(() => { element.dataset.lufeMailEntered = ""; }, reduced ? 0 : 900);
    const answer = window.setTimeout(() => { element.dataset.lufeMailAnswered = ""; }, reduced ? 0 : 3200);
    return () => {
      window.clearTimeout(enter);
      window.clearTimeout(answer);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="lufe-mail-preview">
      <span className="lufe-mail-demo">示意</span>
      <div className="lufe-mail-heading"><span>📩 新郵件</span><span>週五 23:04</span></div>
      <strong>Where is my refund?</strong>
      <p>I returned the order two weeks ago and haven&apos;t heard back…</p>
      <div className="lufe-mail-reply">✓ 已由菲律賓客服回覆 · 23:09</div>
    </div>
  );
}
