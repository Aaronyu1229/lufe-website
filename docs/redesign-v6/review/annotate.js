(() => {
  "use strict";

  const REVIEW_ROOT_CLASS = "lrv-root";
  const DEFAULT_DOCUMENT = { version: 1, notes: [], pagesDone: [] };
  const CATEGORY_NAMES = ["文字", "排版", "圖片", "刪掉", "新增", "其他"];
  const SCOPE_NAMES = ["只改這一塊", "這一塊和周圍", "整個區段"];
  const state = {
    document: { ...DEFAULT_DOCUMENT },
    pages: [],
    annotateMode: false,
    panelOpen: false,
    panelMode: "list",
    selectedElement: null,
    editingNoteId: null,
    hoveredElement: null,
    root: null,
    toolbar: null,
    panel: null,
    hoverOutline: null,
    selectedOutline: null,
    toast: null,
    targets: new Map(),
    pinElements: new Map(),
    positionQueued: false,
  };

  function currentPage() {
    let path = window.location.pathname || "/";
    if (path.endsWith("/index.html")) path = path.slice(0, -11) || "/";
    else if (path.endsWith(".html")) path = path.slice(0, -5) || "/";
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    return path || "/";
  }

  function isReviewElement(element) {
    return Boolean(
      element &&
        element instanceof Element &&
        (element.closest(`.${REVIEW_ROOT_CLASS}`) ||
          Array.from(element.classList || []).some((className) => className.startsWith("lrv-"))),
    );
  }

  function visibleText(element, limit) {
    return (element && element.innerText ? element.innerText : "").trim().slice(0, limit);
  }

  function normaliseText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function headingFor(element) {
    if (!element) return "";
    let nearest = null;
    for (const heading of document.querySelectorAll("h1, h2, h3")) {
      if (isReviewElement(heading)) continue;
      if (heading === element || heading.contains(element)) {
        nearest = heading;
        break;
      }
      if (heading.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING) nearest = heading;
    }
    return visibleText(nearest, 400);
  }

  function elementKind(element) {
    const labels = {
      H1: "標題",
      H2: "標題",
      H3: "標題",
      H4: "標題",
      P: "段落",
      IMG: "圖片",
      A: "連結",
      BUTTON: "按鈕",
      INPUT: "輸入欄",
      TEXTAREA: "文字欄",
      LI: "清單項目",
    };
    return labels[element && element.tagName] || "區塊";
  }

  function escapeIdentifier(value) {
    if (window.CSS && window.CSS.escape) return `#${window.CSS.escape(value)}`;
    return `[id="${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"]`;
  }

  function selectorFor(element) {
    if (!element || isReviewElement(element)) return "";
    const parts = [];
    let current = element;
    while (current && current !== document.body) {
      if (current.id) {
        parts.unshift(escapeIdentifier(current.id));
        return parts.join(" > ");
      }
      const parent = current.parentElement;
      if (!parent) break;
      const sameTagSiblings = Array.from(parent.children).filter(
        (sibling) => sibling.tagName === current.tagName && !isReviewElement(sibling),
      );
      parts.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${sameTagSiblings.indexOf(current) + 1})`);
      current = parent;
    }
    return parts.length ? `body > ${parts.join(" > ")}` : "body";
  }

  function targetMatchesNote(element, note) {
    if (!element || isReviewElement(element)) return false;
    const expected = normaliseText(String(note.textSnippet || "").slice(0, 40));
    return !expected || normaliseText(element.innerText).startsWith(expected);
  }

  function targetForNote(note) {
    if (!note) return null;
    try {
      const direct = note.selector ? document.querySelector(note.selector) : null;
      if (targetMatchesNote(direct, note)) return direct;
    } catch (_) {
      // A stale selector is expected after a site change.
    }
    const expected = normaliseText(String(note.textSnippet || "").slice(0, 40));
    if (!expected) return null;
    return (
      Array.from(document.querySelectorAll("body *")).find(
        (element) => !isReviewElement(element) && normaliseText(element.innerText).startsWith(expected),
      ) || null
    );
  }

  function notesForCurrentPage() {
    return state.document.notes.filter((note) => note && note.page === currentPage());
  }

  function sortedPageNotes() {
    return [...notesForCurrentPage()].sort((first, second) => {
      const firstTarget = state.targets.get(first.id);
      const secondTarget = state.targets.get(second.id);
      if (!firstTarget || !secondTarget) return firstTarget ? -1 : secondTarget ? 1 : 0;
      return firstTarget.compareDocumentPosition(secondTarget) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }

  function isPageDone(path = currentPage()) {
    return state.document.pagesDone.includes(path);
  }

  function progress() {
    const pages = state.pages;
    const done = new Set(state.document.pagesDone);
    return { done: pages.filter((page) => done.has(page)).length, total: pages.length };
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function makeButton(text, className, action) {
    const button = createElement("button", className, text);
    button.type = "button";
    button.addEventListener("click", action);
    return button;
  }

  function ensureInterface() {
    if (state.root && document.body.contains(state.root)) return;
    const root = createElement("div", REVIEW_ROOT_CLASS);
    root.setAttribute("data-lrv-ui", "");
    const hoverOutline = createElement("div", "lrv-outline lrv-hover-outline");
    const hoverLabel = createElement("span", "lrv-outline-label");
    hoverOutline.append(hoverLabel);
    const selectedOutline = createElement("div", "lrv-outline lrv-selected-outline");
    const selectedLabel = createElement("span", "lrv-outline-label");
    selectedOutline.append(selectedLabel);
    const toolbar = createElement("div", "lrv-toolbar");
    const panel = createElement("aside", "lrv-panel");
    const toast = createElement("div", "lrv-toast");
    toast.setAttribute("role", "status");
    root.append(hoverOutline, selectedOutline, toolbar, panel, toast);
    document.body.append(root);
    state.root = root;
    state.toolbar = toolbar;
    state.panel = panel;
    state.hoverOutline = hoverOutline;
    state.selectedOutline = selectedOutline;
    state.toast = toast;
    renderToolbar();
    renderPanel();
    renderPins();
  }

  function renderToolbar() {
    if (!state.toolbar) return;
    const activeNotes = notesForCurrentPage().length;
    const completed = progress();
    const toolbar = state.toolbar;
    toolbar.replaceChildren();

    const primary = createElement("div", "lrv-toolbar-primary");
    const mode = makeButton(
      `備註模式：${state.annotateMode ? "開" : "關"}`,
      `lrv-button lrv-mode-button${state.annotateMode ? " lrv-active" : ""}`,
      () => setAnnotateMode(!state.annotateMode),
    );
    mode.setAttribute("aria-pressed", String(state.annotateMode));
    const list = makeButton(`本頁備註 (${activeNotes})`, "lrv-button", () => {
      state.panelOpen = !state.panelOpen;
      state.panelMode = "list";
      renderPanel();
    });
    const done = makeButton("這頁看完了 ✓", `lrv-button${isPageDone() ? " lrv-done" : ""}`, toggleDone);
    done.setAttribute("aria-pressed", String(isPageDone()));
    primary.append(mode, list, done);

    const links = createElement("div", "lrv-toolbar-links");
    const allNotes = createElement("a", "lrv-link", "全部備註");
    allNotes.href = "/__review/all";
    const mobile = createElement("a", "lrv-link", "手機寬度看");
    mobile.href = `/__review/mobile?path=${encodeURIComponent(currentPage())}`;
    links.append(allNotes, mobile);

    const navigation = createElement("div", "lrv-toolbar-navigation");
    const picker = createElement("select", "lrv-page-picker");
    picker.setAttribute("aria-label", "跳到頁面");
    const placeholder = createElement("option", "", "跳到頁面");
    placeholder.value = "";
    picker.append(placeholder);
    for (const page of state.pages) {
      const option = createElement("option", "", `${isPageDone(page) ? "✓ " : ""}${page}`);
      option.value = page;
      if (page === currentPage()) option.selected = true;
      picker.append(option);
    }
    picker.addEventListener("change", () => {
      if (picker.value) window.location.assign(picker.value);
    });
    navigation.append(picker, createElement("span", "lrv-progress", `已看完 ${completed.done}/${completed.total}`));
    toolbar.append(primary, links, navigation);
  }

  function renderPanel() {
    if (!state.panel) return;
    state.panel.classList.toggle("lrv-panel-open", state.panelOpen);
    state.panel.replaceChildren();
    if (!state.panelOpen) return;

    const header = createElement("div", "lrv-panel-header");
    header.append(
      createElement("h2", "lrv-panel-title", state.panelMode === "editor" ? (state.editingNoteId ? "編輯備註" : "新增備註") : "本頁備註"),
      makeButton("收起", "lrv-icon-button", () => {
        state.panelOpen = false;
        renderPanel();
      }),
    );
    state.panel.append(header);
    if (state.panelMode === "editor") renderEditor();
    else renderNoteList();
  }

  function renderEditor() {
    const panel = state.panel;
    const existing = state.document.notes.find((note) => note.id === state.editingNoteId);
    const selected = state.selectedElement;
    const form = createElement("div", "lrv-editor");
    const description = createElement("div", "lrv-selection-description");
    description.append(
      createElement("p", "", `所在區段：${selected ? headingFor(selected) || "找不到區段標題" : existing?.heading || "找不到位置"}`),
      createElement("p", "", `選取內容：${selected ? visibleText(selected, 80) || "（沒有可讀文字）" : existing?.textSnippet?.slice(0, 80) || "（沒有可讀文字）"}`),
    );
    form.append(description);

    const selectionControls = createElement("div", "lrv-selection-controls");
    const larger = makeButton("選大一點（往外一層）", "lrv-button", () => {
      if (state.selectedElement?.parentElement && state.selectedElement.parentElement !== document.body) {
        state.selectedElement = state.selectedElement.parentElement;
        refreshSelection();
        renderPanel();
      }
    });
    larger.disabled = !selected || selected.parentElement === document.body;
    const smaller = makeButton("選小一點", "lrv-button", () => {
      const child = Array.from(state.selectedElement?.children || []).find((item) => !isReviewElement(item));
      if (child) {
        state.selectedElement = child;
        refreshSelection();
        renderPanel();
      } else {
        showToast("沒有更小的內容可選", "warning");
      }
    });
    smaller.disabled = !selected || !Array.from(selected.children).some((item) => !isReviewElement(item));
    selectionControls.append(larger, smaller);
    form.append(selectionControls);

    const scopeField = createElement("fieldset", "lrv-fieldset");
    scopeField.append(createElement("legend", "", "調整範圍"));
    const selectedScope = existing?.scope || "只改這一塊";
    for (const scope of SCOPE_NAMES) {
      const label = createElement("label", "lrv-radio-label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "lrv-scope";
      input.value = scope;
      input.checked = scope === selectedScope;
      label.append(input, document.createTextNode(scope));
      scopeField.append(label);
    }
    form.append(scopeField);

    const categories = createElement("fieldset", "lrv-fieldset");
    categories.append(createElement("legend", "", "分類（可複選）"));
    const chips = createElement("div", "lrv-chip-list");
    const selectedCategories = new Set(existing?.categories || []);
    for (const category of CATEGORY_NAMES) {
      const chip = makeButton(category, `lrv-chip${selectedCategories.has(category) ? " lrv-chip-selected" : ""}`, () => {
        chip.classList.toggle("lrv-chip-selected");
        chip.setAttribute("aria-pressed", String(chip.classList.contains("lrv-chip-selected")));
      });
      chip.dataset.category = category;
      chip.setAttribute("aria-pressed", String(selectedCategories.has(category)));
      chips.append(chip);
    }
    categories.append(chips);
    form.append(categories);

    const textarea = document.createElement("textarea");
    textarea.className = "lrv-textarea";
    textarea.placeholder = "這裡想怎麼改？例如：這句太長，改成…／這兩塊對調／字太小";
    textarea.value = existing?.text || "";
    textarea.rows = 5;
    textarea.setAttribute("aria-label", "備註內容");
    form.append(textarea);

    const actions = createElement("div", "lrv-editor-actions");
    actions.append(
      makeButton("儲存", "lrv-button lrv-save-button", async () => {
        const text = textarea.value.trim();
        if (!text) {
          showToast("請先寫下備註內容", "warning");
          textarea.focus();
          return;
        }
        const scope = form.querySelector('input[name="lrv-scope"]:checked')?.value || "只改這一塊";
        const selectedChips = Array.from(form.querySelectorAll(".lrv-chip-selected")).map((chip) => chip.dataset.category);
        saveNote(existing, text, scope, selectedChips);
      }),
      makeButton("取消", "lrv-button", () => {
        state.panelMode = "list";
        state.editingNoteId = null;
        state.selectedElement = null;
        refreshSelection();
        renderPanel();
      }),
    );
    if (existing) {
      actions.append(
        makeButton("刪除", "lrv-button lrv-delete-button", () => {
          if (window.confirm("確定要刪除這則備註嗎？")) deleteNote(existing.id);
        }),
      );
    }
    form.append(actions);
    panel.append(form);
  }

  function renderNoteList() {
    const panel = state.panel;
    const notes = sortedPageNotes();
    const found = notes.filter((note) => state.targets.get(note.id));
    const missing = notes.filter((note) => !state.targets.get(note.id));
    if (!notes.length) {
      panel.append(createElement("p", "lrv-empty-state", "本頁還沒有備註。"));
      return;
    }
    const list = createElement("div", "lrv-note-list");
    for (const note of found) list.append(noteListItem(note, state.targets.get(note.id)));
    panel.append(list);
    if (missing.length) {
      panel.append(createElement("h3", "lrv-missing-title", "找不到位置的備註"));
      const missingList = createElement("div", "lrv-note-list");
      for (const note of missing) missingList.append(noteListItem(note, null));
      panel.append(missingList);
    }
  }

  function noteListItem(note, target) {
    const item = createElement("button", "lrv-note-item");
    item.type = "button";
    item.append(
      createElement("strong", "", note.heading || "找不到區段標題"),
      createElement("span", "", visibleNoteText(note.textSnippet) || "（沒有可讀文字）"),
      createElement("span", "lrv-note-copy", note.text || ""),
    );
    item.addEventListener("click", () => {
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        flashElement(target);
      }
      openEditor(target, note);
    });
    return item;
  }

  function visibleNoteText(text) {
    return String(text || "").slice(0, 120);
  }

  function renderPins() {
    if (!state.root) return;
    for (const pin of state.pinElements.values()) pin.remove();
    state.pinElements.clear();
    state.targets.clear();
    const notes = notesForCurrentPage();
    for (const note of notes) {
      const target = targetForNote(note);
      if (target) state.targets.set(note.id, target);
    }
    const ordered = sortedPageNotes();
    ordered.forEach((note, index) => {
      const target = state.targets.get(note.id);
      if (!target) return;
      const pin = makeButton(String(index + 1), "lrv-pin", () => openEditor(target, note));
      pin.setAttribute("aria-label", `第 ${index + 1} 則備註`);
      pin.dataset.noteId = note.id;
      state.root.append(pin);
      state.pinElements.set(note.id, pin);
    });
    schedulePositions();
  }

  function updateOutline(outline, element, label) {
    if (!outline) return;
    if (!element || !state.annotateMode) {
      outline.classList.remove("lrv-outline-visible");
      return;
    }
    const rectangle = element.getBoundingClientRect();
    outline.style.left = `${Math.max(0, rectangle.left)}px`;
    outline.style.top = `${Math.max(0, rectangle.top)}px`;
    outline.style.width = `${Math.max(0, rectangle.width)}px`;
    outline.style.height = `${Math.max(0, rectangle.height)}px`;
    outline.firstElementChild.textContent = label;
    outline.classList.add("lrv-outline-visible");
  }

  function refreshSelection() {
    const label = state.selectedElement ? `已選取：${elementKind(state.selectedElement)}` : "";
    updateOutline(state.selectedOutline, state.selectedElement, label);
    schedulePositions();
  }

  function schedulePositions() {
    if (state.positionQueued) return;
    state.positionQueued = true;
    window.requestAnimationFrame(() => {
      state.positionQueued = false;
      positionInterface();
    });
  }

  function positionInterface() {
    updateOutline(
      state.hoverOutline,
      state.hoveredElement,
      state.hoveredElement ? `目前選取：${elementKind(state.hoveredElement)}` : "",
    );
    refreshSelectionOutlineOnly();
    for (const [noteId, pin] of state.pinElements) {
      const target = state.targets.get(noteId);
      if (!target) continue;
      const rectangle = target.getBoundingClientRect();
      const visible = rectangle.bottom > 0 && rectangle.top < window.innerHeight && rectangle.right > 0 && rectangle.left < window.innerWidth;
      pin.classList.toggle("lrv-pin-hidden", !visible);
      if (visible) {
        pin.style.left = `${Math.min(window.innerWidth - 28, Math.max(0, rectangle.right - 10))}px`;
        pin.style.top = `${Math.max(0, rectangle.top + 4)}px`;
      }
    }
  }

  function refreshSelectionOutlineOnly() {
    if (!state.selectedOutline) return;
    if (!state.selectedElement || !state.annotateMode) {
      state.selectedOutline.classList.remove("lrv-outline-visible");
      return;
    }
    const rectangle = state.selectedElement.getBoundingClientRect();
    state.selectedOutline.style.left = `${Math.max(0, rectangle.left)}px`;
    state.selectedOutline.style.top = `${Math.max(0, rectangle.top)}px`;
    state.selectedOutline.style.width = `${Math.max(0, rectangle.width)}px`;
    state.selectedOutline.style.height = `${Math.max(0, rectangle.height)}px`;
    state.selectedOutline.firstElementChild.textContent = `已選取：${elementKind(state.selectedElement)}`;
    state.selectedOutline.classList.add("lrv-outline-visible");
  }

  function setAnnotateMode(enabled) {
    state.annotateMode = enabled;
    document.documentElement.classList.toggle("lrv-annotating", enabled);
    if (!enabled) state.hoveredElement = null;
    renderToolbar();
    refreshSelection();
    schedulePositions();
  }

  function openEditor(element, note) {
    state.selectedElement = element || null;
    state.editingNoteId = note ? note.id : null;
    state.panelOpen = true;
    state.panelMode = "editor";
    refreshSelection();
    renderPanel();
  }

  async function saveNote(existing, text, scope, categories) {
    const now = new Date().toISOString();
    let note;
    if (existing) {
      note = existing;
    } else {
      note = {
        id: `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        page: currentPage(),
        selector: "",
        textSnippet: "",
        heading: "",
        outerHTMLSnippet: "",
        viewportWidth: window.innerWidth,
        scope: "只改這一塊",
        categories: [],
        text: "",
        createdAt: now,
        updatedAt: now,
        status: "open",
      };
      state.document.notes.push(note);
    }
    if (state.selectedElement) {
      note.page = currentPage();
      note.selector = selectorFor(state.selectedElement);
      note.textSnippet = visibleText(state.selectedElement, 200);
      note.heading = headingFor(state.selectedElement);
      note.outerHTMLSnippet = state.selectedElement.outerHTML.slice(0, 1500);
      note.viewportWidth = window.innerWidth;
    }
    note.scope = scope;
    note.categories = categories.filter(Boolean);
    note.text = text;
    note.updatedAt = now;
    note.status = "open";
    await persist();
    state.panelMode = "list";
    state.editingNoteId = null;
    state.selectedElement = null;
    refreshSelection();
    renderPins();
    renderToolbar();
    renderPanel();
  }

  async function deleteNote(noteId) {
    state.document.notes = state.document.notes.filter((note) => note.id !== noteId);
    await persist();
    state.panelMode = "list";
    state.editingNoteId = null;
    state.selectedElement = null;
    refreshSelection();
    renderPins();
    renderToolbar();
    renderPanel();
  }

  async function toggleDone() {
    const page = currentPage();
    if (isPageDone(page)) state.document.pagesDone = state.document.pagesDone.filter((item) => item !== page);
    else state.document.pagesDone.push(page);
    await persist();
    renderToolbar();
  }

  function documentFrom(value) {
    if (!value || typeof value !== "object") return { ...DEFAULT_DOCUMENT };
    return {
      ...value,
      version: Number(value.version) || 1,
      notes: Array.isArray(value.notes) ? value.notes.filter((note) => note && typeof note === "object") : [],
      pagesDone: Array.isArray(value.pagesDone) ? value.pagesDone.filter((page) => typeof page === "string") : [],
    };
  }

  async function persist() {
    const encoded = JSON.stringify(state.document);
    try {
      const response = await fetch("/__review/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: encoded,
      });
      if (!response.ok) throw new Error("save failed");
      window.localStorage.removeItem("lrv-notes-pending");
      showToast("已儲存", "success");
      return true;
    } catch (_) {
      try {
        window.localStorage.setItem("lrv-notes-pending", encoded);
      } catch (_) {
        // The visible warning still directs the reviewer to the server problem.
      }
      showToast("備註沒存到檔案，請確認 serve.py 還開著", "error");
      return false;
    }
  }

  function showToast(message, kind) {
    if (!state.toast) return;
    state.toast.textContent = message;
    state.toast.className = `lrv-toast lrv-toast-visible lrv-toast-${kind}`;
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => state.toast.classList.remove("lrv-toast-visible"), 2800);
  }

  function flashElement(element) {
    element.classList.add("lrv-flash");
    window.setTimeout(() => element.classList.remove("lrv-flash"), 1200);
  }

  async function load() {
    ensureInterface();
    try {
      const [notesResponse, pagesResponse] = await Promise.all([fetch("/__review/notes"), fetch("/__review/pages")]);
      if (!notesResponse.ok || !pagesResponse.ok) throw new Error("load failed");
      state.document = documentFrom(await notesResponse.json());
      const snapshot = await pagesResponse.json();
      state.pages = Array.isArray(snapshot.pages) ? snapshot.pages : [];
    } catch (_) {
      state.document = { ...DEFAULT_DOCUMENT };
      state.pages = [];
      showToast("無法讀取備註檔案，請確認 serve.py 還開著", "error");
    }
    try {
      const pending = window.localStorage.getItem("lrv-notes-pending");
      if (pending) state.document = documentFrom(JSON.parse(pending));
    } catch (_) {
      // A damaged browser cache should not stop the review interface.
    }
    renderPins();
    renderToolbar();
    renderPanel();
    openHashedNote();
  }

  function openHashedNote() {
    const match = window.location.hash.match(/^#__note=(.+)$/);
    if (!match) return;
    const note = state.document.notes.find((item) => item.id === decodeURIComponent(match[1]));
    if (!note) return;
    const target = state.targets.get(note.id);
    if (target) {
      target.scrollIntoView({ block: "center" });
      flashElement(target);
    }
    openEditor(target, note);
  }

  function retryPending() {
    try {
      if (window.localStorage.getItem("lrv-notes-pending")) persist();
    } catch (_) {
      // Storage can be disabled by the browser.
    }
  }

  document.addEventListener(
    "pointermove",
    (event) => {
      if (!state.annotateMode) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || isReviewElement(target)) return;
      state.hoveredElement = target;
      schedulePositions();
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      if (!state.annotateMode) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || isReviewElement(target)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      openEditor(target, null);
    },
    true,
  );

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const typing =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      (target instanceof HTMLElement && target.isContentEditable);
    if (!typing && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "n") {
      event.preventDefault();
      setAnnotateMode(!state.annotateMode);
    }
  });

  window.addEventListener("scroll", schedulePositions, true);
  window.addEventListener("resize", schedulePositions);
  const observer = new MutationObserver(() => {
    if (!state.root || !document.body.contains(state.root)) ensureInterface();
    schedulePositions();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (window.ResizeObserver) new ResizeObserver(schedulePositions).observe(document.body);
  window.setInterval(retryPending, 10000);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, { once: true });
  else load();
})();
