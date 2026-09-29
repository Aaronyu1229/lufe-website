"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { clamp, draggable, nearest, project, rubberband, useSpring } from "@/lib/motion";

interface MessageBoxContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const MessageBoxContext = createContext<MessageBoxContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function useMessageBox() {
  return useContext(MessageBoxContext);
}

export function MessageBoxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return <MessageBoxContext.Provider value={{ isOpen, open, close }}>{children}</MessageBoxContext.Provider>;
}

const emptyForm = { name: "", contact: "", message: "" };

export function MessageBox() {
  const { isOpen, close } = useMessageBox();
  const [present, setPresent] = useState(false);
  const [closedPosition, setClosedPosition] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sheetRef = useRef<HTMLDivElement>(null);
  const grabRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const presentRef = useRef(false);
  const closedY = useRef(0);
  const dragFrom = useRef(0);
  const sheetY = useSpring(0);

  const measure = useCallback(() => {
    closedY.current = (sheetRef.current?.offsetHeight ?? window.innerHeight) + 30;
    setClosedPosition(closedY.current);
    return closedY.current;
  }, []);

  const stops = useCallback(() => {
    const closed = measure();
    const sheetHeight = sheetRef.current?.offsetHeight ?? window.innerHeight;
    return [Math.max(0, sheetHeight - window.innerHeight * 0.56), 0, closed];
  }, [measure]);

  const dismiss = useCallback((velocity?: number) => {
    close();
    sheetY.to(measure(), { response: 0.4, velocity, onRest: () => {
      presentRef.current = false;
      setPresent(false);
    } });
    returnFocusRef.current?.focus({ preventScroll: true });
  }, [close, measure, sheetY]);

  useLayoutEffect(() => {
    sheetY.jump(measure());
    const onResize = () => {
      const wasClosed = sheetY.target >= closedY.current - 1;
      const closed = measure();
      if (wasClosed) sheetY.jump(closed);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, sheetY]);

  useEffect(() => {
    if (!isOpen) {
      if (presentRef.current) sheetY.to(measure(), { response: 0.4, onRest: () => {
        presentRef.current = false;
        setPresent(false);
      } });
      return;
    }

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    presentRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- presence keeps the exit spring mounted.
    setPresent(true);
    const detents = stops();
    sheetY.to(window.innerWidth < 700 ? detents[0] : detents[1], { response: 0.45 });
    const timer = window.setTimeout(() => {
      const firstField = sheetRef.current?.querySelector<HTMLElement>("input, textarea, select");
      (firstField ?? sheetRef.current?.querySelector<HTMLElement>("button"))?.focus({ preventScroll: true });
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
    return () => window.clearTimeout(timer);
  }, [isOpen, measure, sheetY, stops]);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return;
    const progress = clamp(1 - sheetY.value / Math.min(Math.max(closedY.current, 1), window.innerHeight * 0.6), 0, 1);
    main.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;
    main.style.transform = progress > 0.001 ? `scale(${1 - 0.05 * progress})` : "";
    return () => {
      main.style.transform = "";
      main.style.transformOrigin = "";
    };
  }, [sheetY.value]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const grab = grabRef.current;
    if (!grab) return;
    return draggable(grab, "y", {
      start() {
        if (!isOpen) return;
        sheetY.stop();
        dragFrom.current = sheetY.value;
      },
      move(delta) {
        if (!isOpen) return;
        const top = Math.min(...stops());
        const next = dragFrom.current + delta;
        sheetY.jump(next < top ? top + rubberband(next - top, window.innerHeight) : next);
      },
      end(velocity) {
        if (!isOpen) return;
        const target = nearest(stops(), sheetY.value + project(velocity));
        if (target === closedY.current) {
          dismiss(velocity);
          return;
        }
        sheetY.to(target, { velocity, damping: Math.abs(velocity) > 500 ? 0.8 : 1, response: 0.3 });
      },
    });
  }, [dismiss, isOpen, sheetY, stops]);

  const validate = (field: keyof typeof emptyForm) => {
    const messages = { name: "請填姓名", contact: "請留 Email 或電話", message: "請簡單說明一下" };
    const valid = Boolean(form[field].trim());
    setErrors((current) => ({ ...current, [field]: valid ? "" : messages[field] }));
    return valid;
  };

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (value.trim()) setErrors((current) => current[field] ? { ...current, [field]: "" } : current);
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "請填姓名";
    if (!form.contact.trim()) nextErrors.contact = "請留 Email 或電話";
    if (!form.message.trim()) nextErrors.message = "請簡單說明一下";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleClose = () => {
    dismiss();
    window.setTimeout(() => {
      setSubmitted(false);
      setForm(emptyForm);
      setErrors({});
    }, 300);
  };

  const viewportHeight = typeof window === "undefined" ? 1 : window.innerHeight;
  const progress = clamp(1 - sheetY.value / Math.min(Math.max(closedPosition, 1), viewportHeight * 0.6), 0, 1);

  return <>
    <div aria-hidden={!present} className="fixed inset-0 z-[190] bg-[#0A1222]/[.42]" style={{ opacity: progress, pointerEvents: isOpen ? "auto" : "none", visibility: present ? "visible" : "hidden" }} onClick={() => dismiss()} />
    <div ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="message-box-title" aria-hidden={!present} className="lufe-glass-panel fixed bottom-0 left-1/2 z-[200] flex h-[calc(100svh-40px)] w-[min(640px,100%)] flex-col text-tx" style={{ transform: `translate3d(-50%, ${sheetY.value}px, 0)`, visibility: present ? "visible" : "hidden" }}>
      <div ref={grabRef} className="touch-none select-none px-6 pb-[6px] pt-[10px] cursor-grab active:cursor-grabbing">
        <i className="mx-auto mb-[10px] block h-[5px] w-10 bg-black/20" />
        <div className="flex items-center justify-between gap-3"><h3 id="message-box-title" className="text-[21px] font-semibold">聊聊你的產品</h3><button type="button" aria-label="關閉" onClick={handleClose} className="grid h-11 w-11 cursor-pointer place-items-center bg-black/[.06] text-[22px] text-tx2 hover:bg-black/[.1]">×</button></div>
      </div>
      <div className="flex-1 overflow-auto overscroll-contain px-6 pb-8 pt-1">
        {!submitted ? <form noValidate onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
          <Field label="你的姓名 *" error={errors.name}><input required aria-required="true" className={`w-full border px-[13px] py-2.5 text-[15px] outline-none focus:border-gold ${errors.name ? "border-red-400" : "border-bd"}`} placeholder="怎麼稱呼你？" value={form.name} onFocus={() => sheetY.to(0, { response: 0.4 })} onBlur={() => validate("name")} onChange={(event) => updateField("name", event.target.value)} /></Field>
          <Field label="聯絡方式（Email 或電話）*" error={errors.contact}><input required aria-required="true" className={`w-full border px-[13px] py-2.5 text-[15px] outline-none focus:border-gold ${errors.contact ? "border-red-400" : "border-bd"}`} placeholder="方便我們回覆你" value={form.contact} onFocus={() => sheetY.to(0, { response: 0.4 })} onBlur={() => validate("contact")} onChange={(event) => updateField("contact", event.target.value)} /></Field>
          <Field label="簡單說說你的產品跟想法 *" error={errors.message}><textarea required aria-required="true" className={`min-h-[68px] w-full resize-y border px-[13px] py-2.5 text-[15px] outline-none focus:border-gold ${errors.message ? "border-red-400" : "border-bd"}`} placeholder="例如：我們做鳳梨酥，想看看美國有沒有機會⋯⋯" value={form.message} onFocus={() => sheetY.to(0, { response: 0.4 })} onBlur={() => validate("message")} onChange={(event) => updateField("message", event.target.value)} /></Field>
          <button type="submit" className="w-full cursor-pointer bg-navy py-3 text-[15px] font-semibold text-white hover:bg-navy-l">送出，我們 24 小時內回覆</button>
        </form> : <div className="px-5 py-8 text-center"><h3 className="mb-1.5 text-[17px] font-semibold">收到了！</h3><p className="text-[14.5px] font-light text-tx2">我們會在 24 小時內回覆你。</p></div>}
      </div>
    </div>
  </>;
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <div className="mb-3"><label className="mb-[5px] block text-[11.5px] font-semibold text-tx">{label}</label>{children}{error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}</div>;
}
