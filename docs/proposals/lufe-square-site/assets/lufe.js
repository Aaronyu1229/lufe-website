/* LUFÉ fluid-interface proposal — shared motion + chrome.
 *
 * Page contract (see WORK-ORDER.md):
 *   <body data-page="services" data-hero="dark|light">
 *   <div data-lufe-nav></div> … <main>…</main> … <div data-lufe-footer></div>
 *   <template id="lufe-notes"><li>…</li>…</template>   (optional per-page notes)
 *   <script src="assets/lufe.js"></script>  then page script using window.LUFE
 *
 * Every animation runs on one spring model (damping ratio + response), always starts
 * from the live on-screen value and keeps velocity when re-targeted, so any motion
 * can be grabbed and reversed mid-flight.
 */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const haptic = () => { try { navigator.vibrate && navigator.vibrate(8); } catch (_) {} };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  // Apple's momentum projection (Designing Fluid Interfaces sample code).
  const project = (vel, d = .998) => (vel / 1000) * d / (1 - d);
  const rubberband = (over, dim, c = .55) => (over * dim * c) / (dim + c * Math.abs(over));
  const nearest = (list, x) => list.reduce((a, b) => (Math.abs(b - x) < Math.abs(a - x) ? b : a));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function spring(initial, onUpdate, precision = .5) {
    let x = initial, v = 0, target = initial, raf = 0, cfg = { damping: 1, response: .4 }, onRest = null;
    const tick = last => now => {
      const dt = Math.min(.032, (now - last) / 1000);
      const k = (2 * Math.PI / cfg.response) ** 2, c = 4 * Math.PI * cfg.damping / cfg.response;
      v += (-k * (x - target) - c * v) * dt; x += v * dt;
      if (Math.abs(v) < precision * 10 && Math.abs(x - target) < precision) {
        x = target; v = 0; raf = 0; onUpdate(x); const cb = onRest; onRest = null; cb && cb(); return;
      }
      onUpdate(x); raf = requestAnimationFrame(tick(now));
    };
    return {
      get value() { return x; }, get target() { return target; }, get moving() { return !!raf; },
      stop() { cancelAnimationFrame(raf); raf = 0; },
      jump(t) { cancelAnimationFrame(raf); raf = 0; x = target = t; v = 0; onUpdate(x); },
      /* o: { damping=1, response=.4, velocity, onRest } — bounce (<1) only after a flick. */
      to(t, o = {}) {
        target = t; cfg = { damping: o.damping ?? 1, response: o.response ?? .4 }; onRest = o.onRest || null;
        if (o.velocity !== undefined) v = o.velocity;
        if (reduce) { this.jump(t); const cb = onRest; onRest = null; cb && cb(); return; }
        if (!raf) raf = requestAnimationFrame(tick(performance.now()));
      },
    };
  }

  /* Pointer drag with ~10px hysteresis and axis lock. The other axis stays with the browser
     (native scroll). end(velocity px/s) uses the last ~100ms of samples. A completed drag
     never also fires a click on what is under the pointer. */
  function draggable(el, axis, { start, move, end }) {
    let id = null, sx = 0, sy = 0, locked = false, dead = false, hist = [], dragged = false;
    el.addEventListener('dragstart', e => e.preventDefault());
    el.addEventListener('pointerdown', e => {
      if (e.button > 0 || id !== null) return;
      id = e.pointerId; sx = e.clientX; sy = e.clientY; locked = dead = dragged = false; hist = [];
    });
    el.addEventListener('pointermove', e => {
      if (e.pointerId !== id || dead) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!locked) {
        if (Math.hypot(dx, dy) < 10) return;
        if ((Math.abs(dx) > Math.abs(dy)) !== (axis === 'x')) { dead = true; return; }
        locked = dragged = true; el.setPointerCapture(id); sx = e.clientX; sy = e.clientY; start && start();
      }
      const p = axis === 'x' ? e.clientX : e.clientY;
      hist.push({ t: e.timeStamp, p }); while (hist.length > 2 && e.timeStamp - hist[0].t > 100) hist.shift();
      move(axis === 'x' ? e.clientX - sx : e.clientY - sy);
    });
    const finish = e => {
      if (e.pointerId !== id) return;
      id = null;
      if (!locked) return;
      locked = false;
      const a = hist[0], b = hist[hist.length - 1];
      const vel = a && b && b.t - a.t > 0 && e.timeStamp - b.t < 80 ? (b.p - a.p) / ((b.t - a.t) / 1000) : 0;
      end(vel);
    };
    el.addEventListener('pointerup', finish);
    el.addEventListener('pointercancel', finish);
    el.addEventListener('click', e => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);
  }

  /* Momentum carousel: free flick, lands on the card edge nearest the projected resting point.
     Markup: .car-vp > .car-track > items. Optional prev/next buttons. Trackpad swipe supported. */
  function carousel(vp, { prev, next } = {}) {
    const track = vp.querySelector('.car-track');
    let items = [...track.children], snaps = [0], minX = 0, from = 0, wheelT = 0;
    const measure = () => {
      items = [...track.children];
      if (!items.length) { snaps = [0]; minX = 0; return; }
      const pad = parseFloat(getComputedStyle(track).paddingLeft);
      const last = items[items.length - 1];
      minX = Math.min(0, -(last.offsetLeft + last.offsetWidth + pad - vp.clientWidth));
      snaps = [...new Set(items.map(c => Math.max(minX, -(c.offsetLeft - pad))).concat(minX))].sort((a, b) => b - a);
    };
    const render = x => {
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (prev) prev.disabled = x > -2;
      if (next) next.disabled = x < minX + 2;
    };
    const s = spring(0, render);
    const band = x => (x > 0 ? rubberband(x, vp.clientWidth) : x < minX ? minX + rubberband(x - minX, vp.clientWidth) : x);
    draggable(vp, 'x', {
      start() { vp.classList.add('dragging'); s.stop(); from = s.value; },
      move(d) { s.jump(band(from + d)); },
      end(vel) {
        vp.classList.remove('dragging');
        const target = nearest(snaps, clamp(s.value + project(vel), minX, 0));
        if (target !== nearest(snaps, from)) haptic();
        s.to(target, { velocity: vel, response: .5, damping: Math.abs(vel) > 500 ? .9 : 1 });
      },
    });
    const step = dir => { const i = snaps.indexOf(nearest(snaps, s.target)); s.to(snaps[clamp(i + dir, 0, snaps.length - 1)], { response: .5 }); };
    prev && prev.addEventListener('click', () => step(-1));
    next && next.addEventListener('click', () => step(1));
    vp.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); s.stop(); s.jump(band(s.value - e.deltaX));
      clearTimeout(wheelT); wheelT = setTimeout(() => s.to(nearest(snaps, clamp(s.value, minX, 0)), { response: .45 }), 90);
    }, { passive: false });
    const relayout = () => {
      // Full-bleed carousels align their first card with the page column; one nested inside a column starts flush.
      track.style.paddingInline = vp.getBoundingClientRect().width < document.documentElement.clientWidth - 1 ? '0px' : '';
      measure(); s.jump(nearest(snaps, clamp(s.value, minX, 0)));
    };
    addEventListener('resize', relayout); document.fonts && document.fonts.ready.then(relayout);
    relayout();
    return { relayout, to: i => { measure(); s.to(snaps[clamp(i, 0, snaps.length - 1)], { response: .5 }); } };
  }

  /* Segmented control: the pill slides (and can be redirected mid-slide) between options.
     Markup: .seg > button[aria-pressed]×n. onChange(value, index). value = data-value or text. */
  function segmented(seg, onChange) {
    const btns = [...seg.querySelectorAll('button')];
    const pill = document.createElement('span'); pill.className = 'seg-pill'; seg.prepend(pill);
    let idx = Math.max(0, btns.findIndex(b => b.getAttribute('aria-pressed') === 'true'));
    const geo = () => btns.map(b => [b.offsetLeft, b.offsetWidth]);
    const render = f => {
      const g = geo(), i0 = clamp(Math.floor(f), 0, g.length - 1), i1 = clamp(i0 + 1, 0, g.length - 1), t = f - i0;
      pill.style.transform = `translate3d(${lerp(g[i0][0], g[i1][0], t)}px,0,0)`;
      pill.style.width = lerp(g[i0][1], g[i1][1], t) + 'px';
    };
    const s = spring(idx, render, .002);
    const select = (i, silent) => {
      idx = i; btns.forEach((b, k) => b.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
      s.to(i, { response: .38 });
      const b = btns[i]; if (b.scrollIntoView && seg.scrollWidth > seg.clientWidth) b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      if (!silent && onChange) onChange(b.dataset.value ?? b.textContent.trim(), i);
    };
    btns.forEach((b, i) => { b.type = 'button'; b.addEventListener('click', () => select(i)); });
    seg.setAttribute('role', 'group');
    const relayout = () => s.jump(idx);
    addEventListener('resize', relayout); document.fonts && document.fonts.ready.then(relayout);
    relayout(); btns.forEach((b, k) => b.setAttribute('aria-pressed', k === idx ? 'true' : 'false'));
    return { select };
  }

  /* Layout change without jumps (filters, reorders). LUFE.flip(container, mutate):
     children need a stable data-key. mutate() changes the DOM (hide/show/reorder);
     survivors glide from their old spot on independent X/Y springs, newcomers fade/scale in. */
  const flipSprings = new WeakMap();
  function flip(container, mutate) {
    const kids = () => [...container.children].filter(el => el.dataset.key && el.offsetParent !== null);
    const before = new Map(kids().map(el => [el.dataset.key, el.getBoundingClientRect()]));
    mutate();
    kids().forEach(el => {
      const old = before.get(el.dataset.key), now = el.getBoundingClientRect();
      let s = flipSprings.get(el);
      if (!s) {
        const st = { x: 0, y: 0, o: 1 };
        const apply = () => { el.style.transform = st.x || st.y ? `translate3d(${st.x}px,${st.y}px,0)` : ''; el.style.opacity = st.o < 1 ? st.o : ''; };
        s = { st, x: spring(0, v => { st.x = v; apply(); }), y: spring(0, v => { st.y = v; apply(); }), o: spring(1, v => { st.o = v; apply(); }, .01) };
        flipSprings.set(el, s);
      }
      if (old) {
        // Start from where it is on screen right now (including any in-flight offset).
        s.x.jump(s.st.x + old.left - now.left); s.y.jump(s.st.y + old.top - now.top);
        s.x.to(0, { response: .5 }); s.y.to(0, { response: .5 });
      } else { s.o.jump(0); s.o.to(1, { response: .4 }); }
    });
  }

  /* Sheet with detents. detents: functions (sheetHeight) => translateY; 0 = fully open.
     Drag the .grab area; release snaps to the detent nearest the projected position. */
  let openSheet = null, scrimEl = null;
  function sheet(el, { detents = [() => 0], pushBack = false } = {}) {
    const mainEl = document.querySelector('main');
    let closedY = 0, from = 0, lastDetent = null;
    const measure = () => { closedY = el.offsetHeight + 30; };
    const render = y => {
      el.style.transform = `translate3d(0,${y}px,0)`;
      el.classList.toggle('live', y < closedY - 1);
      const p = clamp(1 - y / Math.min(closedY, innerHeight * .6), 0, 1);
      scrimEl.style.opacity = p; scrimEl.style.pointerEvents = p > .05 ? 'auto' : 'none';
      if (pushBack && mainEl) {
        // Modal task: dim and push the page back so attention lands on the sheet.
        mainEl.style.transformOrigin = `50% ${scrollY + innerHeight / 2}px`;
        mainEl.style.transform = p > .001 ? `scale(${1 - .05 * p})` : '';
      }
    };
    const s = spring(0, render);
    const stops = () => detents.map(f => f(el.offsetHeight)).concat(closedY);
    measure(); s.jump(closedY);
    let returnFocus = null;
    const api = {
      el,
      open(i = 0) {
        if (openSheet && openSheet !== api) openSheet.close();
        returnFocus = document.activeElement;
        openSheet = api; measure(); lastDetent = stops()[i]; s.to(lastDetent, { response: .45 });
        setTimeout(() => (el.querySelector('input,textarea,select') || el.querySelector('button') || el).focus({ preventScroll: true }), reduce ? 0 : 220);
      },
      close(vel) {
        if (openSheet === api) openSheet = null;
        s.to(closedY, { response: .4, velocity: vel });
        returnFocus && returnFocus.focus && returnFocus.focus({ preventScroll: true });
      },
      expand() { const st = stops(), top = Math.min(...st.slice(0, -1)); if (s.target > top) s.to(top, { response: .4 }); },
      get isOpen() { return openSheet === api; },
    };
    draggable(el.querySelector('.grab'), 'y', {
      start() { s.stop(); from = s.value; },
      move(d) { const top = Math.min(...stops()); const y = from + d; s.jump(y < top ? top + rubberband(y - top, innerHeight) : y); },
      end(vel) {
        const target = nearest(stops(), s.value + project(vel));
        if (target === closedY) return api.close(vel);
        if (target !== lastDetent) haptic();
        lastDetent = target;
        s.to(target, { velocity: vel, damping: Math.abs(vel) > 500 ? .8 : 1, response: .3 });
      },
    });
    const x = el.querySelector('[data-close]'); x && x.addEventListener('click', () => api.close());
    addEventListener('resize', () => { const wasClosed = s.target >= closedY - 1; measure(); if (wasClosed) s.jump(closedY); });
    return api;
  }

  /* Expand a card into a detail panel and collapse it back into the same card.
     LUFE.expand(card, { img, html, onOpen }) — html fills the panel body; include an element
     with id="xpTitle" for the dialog label. Drag the image down (or flick) to dismiss. */
  let xp = null;
  function buildXp() {
    const root = document.createElement('div');
    root.className = 'xp'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'xpTitle');
    root.innerHTML = `<div class="xp-scrim"></div><div class="xp-surface"><div class="xp-panel">
      <div class="xp-media"><img alt=""></div>
      <button class="round xp-close" type="button" aria-label="關閉">${ICON.x}</button>
      <div class="xp-body"></div></div></div>`;
    document.body.appendChild(root);
    const q = s => root.querySelector(s);
    const st = { root, scrim: q('.xp-scrim'), surface: q('.xp-surface'), panel: q('.xp-panel'), media: q('.xp-media'), img: q('.xp-media img'), body: q('.xp-body'), close: q('.xp-close'), src: null, from: null, to: null, dy: 0 };
    const finalRect = () => {
      const vw = innerWidth, vh = innerHeight;
      if (vw < 700) return { l: 0, t: 44, w: vw, h: vh - 44 };
      const w = Math.min(760, vw - 80), h = Math.min(vh - 80, 860);
      return { l: (vw - w) / 2, t: (vh - h) / 2, w, h };
    };
    const render = () => {
      const p = st.morph.value, { from, to } = st; if (!from || !to) return;
      const r = { l: lerp(from.l, to.l, p), t: lerp(from.t, to.t, p), w: lerp(from.w, to.w, p), h: lerp(from.h, to.h, p) };
      const vw = innerWidth, vh = innerHeight, pull = Math.max(0, st.dy);
      st.surface.style.clipPath = `inset(${r.t}px ${vw - r.l - r.w}px ${vh - r.t - r.h}px ${r.l}px)`;
      st.panel.style.transform = `translate3d(${r.l - to.l}px,${r.t - to.t}px,0)`;   // content rides the clip's corner
      st.body.style.opacity = clamp((p - .35) / .65, 0, 1);
      st.surface.style.transform = `translate3d(0,${st.dy}px,0) scale(${1 - Math.min(pull, vh) / vh * .08})`;
      st.surface.style.transformOrigin = `50% ${to.t}px`;
      st.scrim.style.opacity = clamp(p, 0, 1) * (1 - clamp(pull / vh, 0, 1));
    };
    st.morph = spring(0, render, .001);
    st.pull = spring(0, v => { st.dy = v; render(); });
    const place = () => { st.to = finalRect(); Object.assign(st.panel.style, { left: st.to.l + 'px', top: st.to.t + 'px', width: st.to.w + 'px', height: st.to.h + 'px' }); };
    const rectOf = el => { const r = el.getBoundingClientRect(); return { l: r.left, t: r.top, w: r.width, h: r.height }; };
    st.open = (card, { img, html, onOpen }) => {
      if (st.src && st.src !== card) { st.src.style.visibility = ''; st.morph.jump(0); }
      st.src = card;
      st.media.classList.toggle('noimg', !img);
      if (img) st.img.src = img; else st.img.removeAttribute('src');
      st.body.innerHTML = html; st.body.scrollTop = 0;
      place(); st.from = rectOf(card);
      root.classList.add('live', 'open'); card.style.visibility = 'hidden';
      st.pull.jump(0); st.morph.to(1, { response: .5 });
      st.close.focus({ preventScroll: true });
      onOpen && onOpen(st.body);
    };
    st.shut = (vel = 0) => {
      if (!st.src) return;
      root.classList.remove('open');
      const card = st.src; st.from = rectOf(card);          // land where the card is now
      st.pull.to(0, { response: .45, velocity: vel });
      st.morph.to(0, { response: .45, onRest: () => { card.style.visibility = ''; root.classList.remove('live'); if (st.src === card) st.src = null; card.focus({ preventScroll: true }); } });
    };
    st.close.addEventListener('click', () => st.shut());
    st.scrim.addEventListener('click', () => st.shut());
    let pFrom = 0;
    draggable(st.media, 'y', {
      start() { st.pull.stop(); pFrom = st.dy; },
      move(d) { const y = pFrom + d; st.pull.jump(y < 0 ? rubberband(y, innerHeight) : y); },
      end(vel) { if (st.dy + project(vel) > innerHeight * .25) st.shut(vel); else st.pull.to(0, { velocity: vel, response: .35 }); },
    });
    addEventListener('resize', () => { if (root.classList.contains('open')) { place(); render(); } });
    return st;
  }
  function expand(card, opts) { xp = xp || buildXp(); xp.open(card, opts); }

  /* ───────── Site chrome ───────── */
  const ICON = {
    x: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    menu: '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 6h12M3 12h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    chevDown: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    left: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2.5 4.5 7 9 11.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2.5 9.5 7 5 11.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><path d="M7 14.5l4.5 4.5L21 9.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  /* Navigation content is verbatim from src/components/Navbar.tsx (desktop mega menus + mobile groups),
     with routes mapped to the proposal's flat file names. */
  const it = (href, title, desc) => ({ href, title, desc });
  const MEGA = {
    services: { label: '服務', layout: 'cols4', cols: [
      ['01 · 產品適配性 · 勝率', [it('services.html#pillar-fit', '支柱總覽', '這個市場真的要你嗎？'), it('services-market-assessment.html', '市場機會評估', '2–4 週搞清楚值不值得去'), it('services-product-testing.html', '小批量產品測試', '真實消費者用錢投票'), it('services-methodology.html', 'MBCPR 決策框架', 'Go / No-Go 五維矩陣')]],
      ['02 · 通路銷售力 · 潛力', [it('services.html#pillar-channel', '支柱總覽', '上得了架，還要賣得動'), it('services-channel-entry.html', '通路進入與媒合', '北美連鎖 + 東南亞通路'), it('services.html#pillar-channel', '展會與加盟佈局', '食品 / 電子 / 加盟展'), it('services.html#pillar-channel', 'AI 集客引擎', 'SEO + AI 搜尋佈局')]],
      ['03 · 團隊體質 · 成功率', [it('services.html#pillar-team', '支柱總覽', '進得去，還要留得下'), it('services-localization.html', '海外團隊建置', '當地人才、落地合規'), it('services-optimize.html', '運營優化方案', '已在海外的進階方案'), it('services.html#pillar-team', '海外營運系統五階', 'Notion + AI 數位員工')]],
      ['工具與入口', [it('assess.html', '2 分鐘處境比對', '跟哪個案例最像'), it('services.html', '三支柱總覽', '一頁看完整方法論'), it('resources.html', '補助與活動', '政府補助 + 現場紀錄'), it('https://tradepiloter.com', 'TradePilot 關稅工具', '免費 HS code 查詢')]],
    ] },
    cases: { label: '案例', layout: 'cases' },
    insights: { label: '洞察', layout: 'cols3' },
    about: { label: '關於我們', layout: 'cols3', cols: [
      ['認識鹿飛', [it('about.html#story', '創辦故事', '我們為什麼做這件事'), it('about.html#team', '團隊組成', '台灣核心團隊 + 全球節點'), it('about.html#how-we-work', '我們怎麼合作', '你會得到什麼樣的陪跑')]],
      ['立場與網絡', [it('about.html#network', '合作夥伴網絡', '北美 / 東南亞 / 全球物流'), it('about.html#philosophy', '品牌理念', '我們相信的事'), it('about.html#what-we-dont-do', '我們不做什麼', '誠實的邊界')]],
    ] },
  };
  const FEATURED_CASES = [
    ['costco-health', '6 個月', '保健品怎麼從台灣走進北美 Costco？', '食品 · 北美'],
    ['electronics-tariff', '-15%', '電子大廠怎麼靠產地轉移省下關稅？', '電子 · 美國'],
    ['shoe-brand', '3x', '知名皮鞋品牌為什麼改賣襪子大賺？', '服飾 · 美國'],
    ['bubble-tea', '10 家', '珍珠奶茶品牌怎麼在菲律賓成功落地？', '飲品 · 東南亞'],
  ];
  const INSIGHT_CATS = [['🇵🇭 菲律賓', '菲律賓'], ['🇮🇩 印尼', '印尼'], ['🌏 東南亞趨勢', '東南亞趨勢'], ['🌎 北美市場', '北美市場'], ['🎯 出海實戰', '出海實戰'], ['🧠 企業體質', '企業體質']];
  const MOBILE = [
    ['服務', [['services-market-assessment.html', '市場評估'], ['services-product-testing.html', '產品測試'], ['services-channel-entry.html', '通路進入'], ['services-localization.html', '海外落地'], ['services-optimize.html', '運營優化方案'], ['services-methodology.html', '鹿飛方法論'], ['services.html', '服務總覽']]],
    ['案例', FEATURED_CASES.map(([slug, num, title]) => [`case.html?slug=${slug}`, `${num} ${title}`]).concat([['cases.html', '看所有案例']])],
    ['洞察', [['insights.html', '所有文章'], ['insights.html?cat=東南亞趨勢', '🌏 東南亞趨勢'], ['insights.html?cat=北美市場', '🌎 北美市場'], ['insights.html?cat=出海實戰', '🎯 出海實戰'], ['insights.html?cat=企業體質', '🧠 企業體質'], ['field-notes.html', '現場紀錄'], ['resources.html', '補助與活動']]],
    ['關於我們', [['about.html#story', '創辦故事'], ['about.html#team', '團隊組成'], ['about.html#how-we-work', '我們怎麼合作'], ['about.html#network', '合作夥伴網絡'], ['about.html#what-we-dont-do', '我們不做什麼']]],
  ];
  const PAGE_OF = { services: 'services', cases: 'cases', case: 'cases', insights: 'insights', article: 'insights', 'field-notes': 'insights', assess: 'services', resources: 'insights', subsidies: 'insights', about: 'about' };

  function navHTML(page) {
    const cur = PAGE_OF[page] || (page && page.startsWith('services') ? 'services' : '');
    const links = Object.entries(MEGA).map(([k, m]) => `<button type="button" data-mega="${k}" aria-expanded="false" aria-controls="mega" class="${cur === k ? 'cur' : ''}">${m.label}</button>`).join('');
    return `<header class="nav" id="nav"><div class="wrap nav-in">
      <a class="brand" href="index.html"><img class="d" src="https://lufe.world/images/logo/logo-mark-white.png" alt=""><img class="w" src="https://lufe.world/images/logo/logo-mark-navy.png" alt="">鹿飛 LUFÉ</a>
      <nav class="nav-links" aria-label="主要">${links}</nav>
      <div class="nav-right"><button class="btn btn-gold btn-sm" type="button" data-chat>聊聊你的產品</button>
      <button class="round menu-btn" type="button" id="menuBtn" aria-expanded="false" aria-controls="mmenu" aria-label="開啟選單">${ICON.menu}</button></div>
    </div></header>`;
  }
  function megaHTML() {
    const ext = h => (h.startsWith('http') ? ' target="_blank" rel="noopener"' : '');
    const col = ([label, items]) => `<div><p class="mlbl">${label}</p>${items.map(i => `<a class="mit" href="${i.href}"${ext(i.href)}><b>${i.title}</b>${i.desc ? `<span>${i.desc}</span>` : ''}</a>`).join('')}</div>`;
    const panes = {
      services: MEGA.services.cols.map(col).join(''),
      cases: `<div><p class="mlbl">精選案例</p><div class="mcases">${FEATURED_CASES.map(([slug, num, title, tags]) => `<a class="mcase" href="case.html?slug=${slug}"><span class="n">${num}</span><span><b>${title}</b><span>${tags}</span></span></a>`).join('')}</div></div>
        <div><p class="mlbl">分類瀏覽</p><p class="msmall">按產業</p><p class="mtext">食品 · 電子 · 服飾 · 餐飲</p><p class="msmall">按市場</p><p class="mtext">北美 · 東南亞</p><a class="mmore" href="cases.html">看所有案例 →</a></div>`,
      insights: `<div><p class="mlbl">主題分類</p>${INSIGHT_CATS.map(([l, c]) => `<a class="mit" href="insights.html?cat=${encodeURIComponent(c)}"><b>${l}</b></a>`).join('')}</div>
        ${col(['其他內容', [it('resources.html', '補助與活動', '政府補助 + 現場紀錄'), it('field-notes.html', '現場紀錄', '活動、演講、媒體露出'), it('https://tradepiloter.com', 'TradePilot 關稅工具'), it('services-methodology.html', '鹿飛方法論'), it('insights.html', '看所有文章')]])}
        <a class="mlatest" href="article.html?slug=overseas-exhibition-subsidy-115-upgrade"><p class="mlbl">最新文章</p><img src="https://lufe.world/images/insights/tradepilot-tariff.jpg" alt=""><b>政府這次是認真的——海外參展補助從 4 萬跳到 16 萬，但你只有兩個月能動</b><span>2026-04-23 · 8 分鐘</span></a>`,
      about: MEGA.about.cols.map(col).join('') + `<div><p class="mlbl">創辦人</p><a class="mfounder" href="about.html"><span class="mono">AY</span><span><b>Aaron Yu</b><small class="gold">鹿飛 LUFÉ 創辦人</small><small>42+ 年國際物流實戰</small><small>500+ 出口案件 · 30+ 國家</small></span></a></div>`,
    };
    const lay = { services: 'cols4', cases: 'cols-cases', insights: 'cols3', about: 'cols3' };
    return `<div class="mega" id="mega">${Object.keys(MEGA).map(k => `<div class="mpane ${lay[k]}" data-k="${k}" role="region" aria-label="${MEGA[k].label}">${panes[k]}</div>`).join('')}</div>`;
  }
  function mobileHTML() {
    return `<div class="pop mmenu" id="mmenu">${MOBILE.map(([g, items], i) => `<div class="mg"><button type="button" aria-expanded="false" aria-controls="mg${i}">${g}<span class="chev" aria-hidden="true">${ICON.chevDown}</span></button><div class="msub" id="mg${i}"><div>${items.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div></div></div>`).join('')}<button class="btn btn-gold mcta" type="button" data-chat>聊聊你的產品 →</button></div>`;
  }
  function footerHTML() {
    const col = (h, items) => `<div><h4>${h}</h4><ul>${items.map(([href, t]) => `<li>${href ? `<a href="${href}">${t}</a>` : t}</li>`).join('')}</ul></div>`;
    return `<footer class="foot"><div class="wrap"><div class="cols">
      <div><a class="brand" href="index.html"><img src="https://lufe.world/images/logo/logo-mark-white.png" alt="" style="width:26px;height:26px">鹿飛 LUFÉ</a><p>協助台灣企業在北美與東南亞落地。產品適配、通路銷售、團隊體質——三個支柱，兩個主戰場。</p></div>
      ${col('服務', [['services.html', '三支柱總覽'], ['services-methodology.html', '鹿飛方法論'], ['services-market-assessment.html', '市場評估'], ['services-product-testing.html', '產品測試'], ['services-channel-entry.html', '通路進入'], ['services-localization.html', '海外落地'], ['services-optimize.html', '進階優化方案']])}
      ${col('案例與洞察', [['cases.html', '案例'], ['insights.html', '洞察與指南'], ['field-notes.html', '現場紀錄']])}
      ${col('資源', [['assess.html', '2 分鐘處境比對'], ['subsidies.html', '政府補助整理'], ['resources.html', '全部資源'], ['https://tradepiloter.com', 'TradePilot 工具'], ['https://jumping.group', '躍馬企業官網']])}
      ${col('聯絡', [['about.html', '關於我們'], ['contact.html', '聯絡我們'], ['mailto:aaron.yu@reborn.in', 'aaron.yu@reborn.in'], ['contact.html#partners', '合作夥伴聯繫'], ['', '台北市']])}
    </div><div class="legal">© 2026 鹿飛 LUFÉ — 版權所有 ·（設計提案稿，非正式站，表單不會送出）</div></div></footer>`;
  }
  // Fields, labels, placeholders, errors and success copy are verbatim from src/components/MessageBox.tsx.
  function chatHTML() {
    const f = (id, label, input, err) => `<div class="field" id="${id}F"><label for="${id}">${label}</label>${input}<div class="err">${err}</div></div>`;
    return `<div class="sheet tall" id="chat" role="dialog" aria-modal="true" aria-labelledby="chatTitle">
      <div class="grab"><i></i><div class="row"><h3 id="chatTitle">聊聊你的產品</h3><button class="round" type="button" data-close aria-label="關閉">${ICON.x}</button></div></div>
      <div class="sheet-body">
        <form novalidate>
          ${f('cName', '你的姓名 *', '<input id="cName" type="text" placeholder="怎麼稱呼你？" autocomplete="name">', '請填姓名')}
          ${f('cContact', '聯絡方式（Email 或電話）*', '<input id="cContact" type="text" placeholder="方便我們回覆你" autocomplete="email">', '請留 Email 或電話')}
          ${f('cMsg', '簡單說說你的產品跟想法 *', '<textarea id="cMsg" placeholder="例如：我們做鳳梨酥，想看看美國有沒有機會⋯⋯"></textarea>', '請簡單說明一下')}
          <button class="btn btn-navy" type="submit" style="width:100%">送出，我們 24 小時內回覆</button>
        </form>
        <div class="done" role="status"><div class="tick">${ICON.check}</div><h3 class="h3" style="margin-bottom:8px">收到了！</h3><p style="color:var(--tx2)">我們會在 24 小時內回覆你。</p><p class="small" style="margin-top:12px">（提案稿，不會真的送出）</p></div>
      </div></div>`;
  }

  const validContact = v => /^\S+@\S+\.\S+$/.test(v) || /^[+\d][\d\s-]{7,}$/.test(v);
  /* Inline validation: checks on blur, clears as soon as the value becomes valid. */
  function validate(field, input, test) {
    input.addEventListener('blur', () => field.classList.toggle('bad', input.value.trim() !== '' && !test(input.value.trim())));
    input.addEventListener('input', () => { if (field.classList.contains('bad') && test(input.value.trim())) field.classList.remove('bad'); });
    return () => { const ok = test(input.value.trim()); field.classList.toggle('bad', !ok); if (!ok) input.focus(); return ok; };
  }
  /* Single-select pill group: .choices > button[aria-pressed]. */
  function choices(group, onChange) {
    group.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      group.querySelectorAll('button').forEach(o => o.setAttribute('aria-pressed', o === b ? 'true' : 'false'));
      onChange && onChange(b.dataset.value ?? b.textContent.trim());
    }));
  }
  /* FAQ disclosure: any .qa > button toggles its .qa. */
  function initQA(root = document) {
    root.querySelectorAll('.qa > button').forEach(b => {
      if (b.dataset.bound) return; b.dataset.bound = '1';
      b.setAttribute('aria-expanded', b.parentElement.classList.contains('open'));
      b.addEventListener('click', () => { const qa = b.parentElement, o = !qa.classList.contains('open'); qa.classList.toggle('open', o); b.setAttribute('aria-expanded', o); });
    });
  }

  function popover(el, trigger, originFn) {
    const s = spring(0, p => {
      el.style.opacity = clamp(p * 1.4, 0, 1); el.style.transform = `scale(${lerp(.6, 1, p)})`;
      el.style.visibility = p > .01 ? 'visible' : 'hidden';
    }, .002);
    const api = {
      get open() { return s.target > .5; },
      set(o) {
        if (o && originFn) originFn(el, trigger);
        trigger.setAttribute('aria-expanded', o); el.style.pointerEvents = o ? 'auto' : 'none'; s.to(o ? 1 : 0, { response: .35 });
      },
    };
    return api;
  }

  function initChrome() {
    const body = document.body, page = body.dataset.page || '', darkHero = body.dataset.hero === 'dark';
    const navSlot = document.querySelector('[data-lufe-nav]'); if (navSlot) navSlot.outerHTML = navHTML(page);
    const footSlot = document.querySelector('[data-lufe-footer]'); if (footSlot) footSlot.outerHTML = footerHTML();
    body.insertAdjacentHTML('beforeend', megaHTML() + mobileHTML() + '<div class="scrim" id="scrim"></div>' + chatHTML());
    scrimEl = document.getElementById('scrim');

    const nav = document.getElementById('nav');
    if (nav) {
      const hero = darkHero && document.querySelector('main > section, main > header');
      if (!hero) nav.classList.add('solid');
      else {
        const upd = () => nav.classList.toggle('solid', hero.getBoundingClientRect().bottom <= 56);
        addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
      }
    }

    // Desktop mega menu: one glass panel under the bar. It grows out of the word you pointed at,
    // and while it is open, moving between words swaps the content in place and glides the height.
    const mega = document.getElementById('mega'), triggers = [...document.querySelectorAll('[data-mega]')], panes = [...mega.querySelectorAll('.mpane')];
    let curMega = null, megaT = 0;
    const reveal = spring(0, p => {
      mega.style.visibility = p > .01 ? 'visible' : 'hidden'; mega.style.pointerEvents = p > .5 ? 'auto' : 'none';
      mega.style.opacity = clamp(p * 1.5, 0, 1); mega.style.transform = `scaleY(${lerp(.92, 1, p)})`;
    }, .002);
    const megaH = spring(0, h => { mega.style.height = h + 'px'; });
    const placeMega = () => {
      const w = Math.min(1200 - 2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter') || 40), innerWidth - 24);
      mega.style.width = w + 'px'; mega.style.left = (innerWidth - w) / 2 + 'px';
    };
    const openMega = k => {
      clearTimeout(megaT);
      const t = triggers.find(x => x.dataset.mega === k), pane = panes.find(p => p.dataset.k === k);
      if (!curMega) { placeMega(); const r = t.getBoundingClientRect(); mega.style.transformOrigin = `${r.left + r.width / 2 - parseFloat(mega.style.left)}px 0`; }
      panes.forEach(p => { p.classList.toggle('on', p === pane); p.inert = p !== pane; });
      triggers.forEach(x => x.setAttribute('aria-expanded', x === t));
      const h = pane.scrollHeight;
      if (!curMega) megaH.jump(h); else megaH.to(h, { response: .35 });
      reveal.to(1, { response: .35 }); curMega = k;
    };
    const closeMega = (delay = 180) => { clearTimeout(megaT); megaT = setTimeout(() => { reveal.to(0, { response: .3 }); triggers.forEach(x => x.setAttribute('aria-expanded', false)); curMega = null; }, delay); };
    triggers.forEach(t => {
      t.addEventListener('mouseenter', () => openMega(t.dataset.mega));
      t.addEventListener('mouseleave', () => closeMega());
      t.addEventListener('focus', () => openMega(t.dataset.mega));
      t.addEventListener('click', e => { e.stopPropagation(); curMega === t.dataset.mega ? closeMega(0) : openMega(t.dataset.mega); });
    });
    mega.addEventListener('mouseenter', () => clearTimeout(megaT));
    mega.addEventListener('mouseleave', () => closeMega());
    addEventListener('resize', () => curMega && placeMega());
    addEventListener('scroll', () => curMega && closeMega(0), { passive: true });

    // Mobile menu: groups open like the live site; the panel grows out of the menu button.
    const mBtn = document.getElementById('menuBtn'), mm = document.getElementById('mmenu');
    const mobile = mBtn && popover(mm, mBtn, el => { el.style.transformOrigin = 'calc(100% - 20px) -10px'; });
    mBtn && mBtn.addEventListener('click', e => { e.stopPropagation(); const o = !mobile.open; mobile.set(o); mBtn.setAttribute('aria-label', o ? '關閉選單' : '開啟選單'); });
    mm.querySelectorAll('.mg > button').forEach(b => b.addEventListener('click', () => { const g = b.parentElement, o = !g.classList.contains('open'); g.classList.toggle('open', o); b.setAttribute('aria-expanded', o); }));
    mm.addEventListener('click', e => { if (e.target.closest('a, [data-chat]')) mobile.set(false); });
    document.addEventListener('click', e => {
      if (curMega && !mega.contains(e.target)) closeMega(0);
      if (mobile && mobile.open && !mm.contains(e.target)) mobile.set(false);
    });

    // Chat sheet — every [data-chat] on the page opens it.
    const chatEl = document.getElementById('chat');
    const chat = sheet(chatEl, { pushBack: true, detents: [h => h - innerHeight * .56, () => 0] });
    const form = chatEl.querySelector('form');
    // Same rule as MessageBox (required, non-empty), but checked as soon as a field is left.
    const filled = v => v !== '';
    const checks = ['cName', 'cContact', 'cMsg'].map(id => {
      const field = document.getElementById(id + 'F'), input = document.getElementById(id);
      input.addEventListener('blur', () => field.classList.toggle('bad', !filled(input.value.trim())));
      input.addEventListener('input', () => { if (filled(input.value.trim())) field.classList.remove('bad'); });
      return () => { const ok = filled(input.value.trim()); field.classList.toggle('bad', !ok); return ok ? null : input; };
    });
    form.querySelectorAll('input,textarea').forEach(el => el.addEventListener('focus', () => chat.expand()));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const firstBad = checks.map(c => c()).find(Boolean);
      if (firstBad) return firstBad.focus();
      haptic(); chatEl.classList.add('sent');
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('[data-chat]')) return;
      e.preventDefault();
      if (xp && xp.root.classList.contains('open')) xp.shut();
      chat.open(innerWidth < 700 ? 0 : 1);
    });

    // Per-page proposal notes.
    const tpl = document.getElementById('lufe-notes');
    if (tpl) {
      body.insertAdjacentHTML('beforeend', `<div class="fab"><button class="btn btn-navy" type="button" id="openNotes">這頁改了什麼</button></div>
        <div class="sheet fit notes" id="notes" role="dialog" aria-modal="true" aria-labelledby="notesTitle">
        <div class="grab"><i></i><div class="row"><h3 id="notesTitle">這頁改了什麼</h3><button class="round" type="button" data-close aria-label="關閉">${ICON.x}</button></div></div>
        <div class="sheet-body"><ol>${tpl.innerHTML}</ol><div class="kept"><b>內容沿用正式站</b>：文字、數字、圖片都跟 lufe.world 一樣，只改設計與互動。</div></div></div>`);
      const notes = sheet(document.getElementById('notes'), { detents: [() => 0] });
      document.getElementById('openNotes').addEventListener('click', () => notes.open(0));
    }
    scrimEl.addEventListener('click', () => openSheet && openSheet.close());

    addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (openSheet) return openSheet.close();
      if (xp && xp.root.classList.contains('open')) return xp.shut();
      if (curMega) closeMega(0); mobile && mobile.open && mobile.set(false);
    });
    initQA();
  }

  window.LUFE = { reduce, haptic, clamp, lerp, project, rubberband, nearest, esc, spring, draggable, carousel, segmented, flip, sheet, expand, validate, validContact, choices, initQA, ICON,
    get chat() { return { open: () => document.querySelector('[data-chat]').click() }; } };
  // lufe.js must be the last markup in <body>: chrome is built synchronously so page scripts after it can use LUFE right away.
  initChrome();
})();
