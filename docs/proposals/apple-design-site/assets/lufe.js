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
    const relayout = () => { measure(); s.jump(nearest(snaps, clamp(s.value, minX, 0))); };
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
      st.surface.style.clipPath = `inset(${r.t}px ${vw - r.l - r.w}px ${vh - r.t - r.h}px ${r.l}px round 22px)`;
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
  const MENUS = {
    services: { label: '服務', href: 'services.html', items: [
      ['services-market-assessment.html', '市場評估', '先花小錢搞清楚'], ['services-product-testing.html', '產品測試', '用真實數據取代猜測'],
      ['services-channel-entry.html', '通路進入', '從試水溫到正式上架'], ['services-localization.html', '海外落地', '賣出去，還要站得穩'],
      ['services-methodology.html', '鹿飛方法論', '我們怎麼做決定'], ['services-optimize.html', '進階優化方案', '海外團隊與運營'],
    ], all: ['services.html', '三支柱總覽'] },
    cases: { label: '案例', href: 'cases.html', items: [
      ['case.html?slug=costco-health', 'Costco 保健品', '6 個月上架北美'], ['case.html?slug=electronics-tariff', '電子產地轉移', '關稅成本 -15%'],
      ['case.html?slug=shoe-brand', '皮鞋品牌賣襪子', '新品類營收 3x'], ['case.html?slug=bubble-tea', '珍奶進馬尼拉', '一年 10 家門市'],
    ], all: ['cases.html', '看全部案例'] },
    insights: { label: '洞察', href: 'insights.html', items: [
      ['insights.html', '洞察與指南', '市場與出海文章'], ['field-notes.html', '現場紀錄', '一線的觀察'],
      ['assess.html', '2 分鐘處境比對', '先看你在哪一步'], ['subsidies.html', '政府補助整理', '115 年度可申請項目'],
    ], all: ['resources.html', '全部資源'] },
    about: { label: '關於我們', href: 'about.html' },
  };
  const PAGE_OF = { services: 'services', cases: 'cases', insights: 'insights', 'field-notes': 'insights', assess: 'insights', resources: 'insights', subsidies: 'insights', about: 'about' };

  function navHTML(page) {
    const cur = PAGE_OF[page] || (page && page.startsWith('services') ? 'services' : page === 'case' ? 'cases' : page === 'article' ? 'insights' : '');
    const links = Object.entries(MENUS).map(([k, m]) => m.items
      ? `<button type="button" data-pop="${k}" aria-expanded="false" class="${cur === k ? 'cur' : ''}">${m.label}</button>`
      : `<a href="${m.href}" class="${cur === k ? 'cur' : ''}">${m.label}</a>`).join('');
    return `<header class="nav" id="nav"><div class="wrap nav-in">
      <a class="brand" href="index.html"><img class="d" src="https://lufe.world/images/logo/logo-mark-white.png" alt=""><img class="w" src="https://lufe.world/images/logo/logo-mark-navy.png" alt="">鹿飛 LUFÉ</a>
      <nav class="nav-links" aria-label="主要">${links}</nav>
      <div class="nav-right"><button class="btn btn-gold btn-sm" type="button" data-chat>聊聊你的產品</button>
      <button class="round menu-btn" type="button" id="menuBtn" aria-expanded="false" aria-label="選單">${ICON.menu}</button></div>
    </div></header>`;
  }
  function popsHTML() {
    const mega = Object.entries(MENUS).filter(([, m]) => m.items).map(([k, m]) => `<div class="pop" id="pop-${k}" role="menu"><div class="grid">
      ${m.items.map(([h, t, s]) => `<a href="${h}" role="menuitem"><b>${t}</b><span>${s}</span></a>`).join('')}
      <a class="all" href="${m.all[0]}" role="menuitem"><b>${m.all[1]} ›</b></a></div></div>`).join('');
    const mobile = `<div class="pop mmenu" id="mmenu" role="menu">${Object.values(MENUS).map(m => `<a href="${m.href}" role="menuitem">${m.label}</a>${m.items ? `<div class="sub">${m.items.map(([h, t]) => `<a href="${h}" role="menuitem">${t}</a>`).join('')}</div>` : ''}`).join('')}<a href="contact.html" role="menuitem">聯絡我們</a></div>`;
    return mega + mobile;
  }
  function footerHTML() {
    const col = (h, items) => `<div><h4>${h}</h4><ul>${items.map(([href, t]) => `<li><a href="${href}">${t}</a></li>`).join('')}</ul></div>`;
    return `<footer class="foot"><div class="wrap"><div class="cols">
      <div><a class="brand" href="index.html"><img src="https://lufe.world/images/logo/logo-mark-white.png" alt="" style="width:26px;height:26px">鹿飛 LUFÉ</a><p>協助台灣企業在北美與東南亞落地。</p></div>
      ${col('服務', [['services.html', '三支柱總覽'], ['services-methodology.html', '鹿飛方法論'], ['services-market-assessment.html', '市場評估'], ['services-product-testing.html', '產品測試'], ['services-channel-entry.html', '通路進入'], ['services-localization.html', '海外落地'], ['services-optimize.html', '進階優化方案']])}
      ${col('案例與洞察', [['cases.html', '案例'], ['insights.html', '洞察與指南'], ['field-notes.html', '現場紀錄']])}
      ${col('資源', [['assess.html', '2 分鐘處境比對'], ['subsidies.html', '政府補助整理'], ['resources.html', '全部資源'], ['https://tradepiloter.com', 'TradePilot 工具'], ['https://jumping.group', '躍馬企業官網']])}
      ${col('聯絡', [['about.html', '關於我們'], ['contact.html', '聯絡我們'], ['mailto:aaron.yu@reborn.in', 'aaron.yu@reborn.in']])}
    </div><div class="legal">© 鹿飛 LUFÉ · 設計提案稿（非正式站，表單不會送出）</div></div></footer>`;
  }
  function chatHTML() {
    return `<div class="sheet tall" id="chat" role="dialog" aria-modal="true" aria-labelledby="chatTitle">
      <div class="grab"><i></i><div class="row"><h3 id="chatTitle">聊聊你的產品</h3><button class="round" type="button" data-close aria-label="關閉">${ICON.x}</button></div></div>
      <div class="sheet-body"><p class="sub">送出後 24 小時內由 Aaron 本人回覆。</p>
        <form novalidate>
          <div class="field"><label for="cProd">你的產品是什麼？</label><textarea id="cProd" placeholder="例如：台灣茶飲、保健食品、電子零件…"></textarea></div>
          <div class="field"><span class="lbl" id="cMk">想去哪個市場？</span><div class="choices" role="group" aria-labelledby="cMk"><button type="button" aria-pressed="false">北美</button><button type="button" aria-pressed="false">東南亞</button><button type="button" aria-pressed="false">還不確定</button></div></div>
          <div class="field" id="cContactF"><label for="cContact">怎麼聯絡你？</label><input id="cContact" type="text" inputmode="email" placeholder="Email 或電話" autocomplete="email"><div class="err">請填 Email 或電話，Aaron 才能回你。</div></div>
          <button class="btn btn-navy" type="submit" style="width:100%">送出</button>
        </form>
        <div class="done" role="status"><div class="tick">${ICON.check}</div><h3 class="h3" style="margin-bottom:8px">收到了</h3><p style="color:var(--tx2)">24 小時內由 Aaron 本人回覆。（提案稿，不會真的送出）</p></div>
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
    body.insertAdjacentHTML('beforeend', popsHTML() + '<div class="scrim" id="scrim"></div>' + chatHTML());
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

    // Desktop mega menus: glass popovers that grow from the item that opened them.
    const pops = [...document.querySelectorAll('[data-pop]')].map(t => {
      const el = document.getElementById('pop-' + t.dataset.pop);
      const p = popover(el, t, (el, t) => {
        const r = t.getBoundingClientRect(), w = el.offsetWidth || 536;
        const left = clamp(r.left + r.width / 2 - w / 2, 12, innerWidth - w - 12);
        el.style.left = left + 'px'; el.style.top = (r.bottom + 10) + 'px';
        el.style.transformOrigin = `${r.left + r.width / 2 - left}px -8px`;
      });
      let hideT = 0;
      const show = () => { clearTimeout(hideT); pops.forEach(o => o !== p && o.set(false)); p.set(true); };
      const hide = () => { hideT = setTimeout(() => p.set(false), 160); };
      t.addEventListener('click', e => { e.stopPropagation(); p.open ? p.set(false) : show(); });
      t.addEventListener('mouseenter', show); t.addEventListener('mouseleave', hide);
      el.addEventListener('mouseenter', () => clearTimeout(hideT)); el.addEventListener('mouseleave', hide);
      p.el = el; return p;
    });
    const mBtn = document.getElementById('menuBtn'), mm = document.getElementById('mmenu');
    const mobile = mBtn && popover(mm, mBtn, (el, t) => { el.style.transformOrigin = 'calc(100% - 20px) -10px'; });
    mBtn && mBtn.addEventListener('click', e => { e.stopPropagation(); mobile.set(!mobile.open); });
    document.addEventListener('click', e => {
      pops.forEach(p => { if (p.open && !p.el.contains(e.target)) p.set(false); });
      if (mobile && mobile.open && !mm.contains(e.target)) mobile.set(false);
    });

    // Chat sheet — every [data-chat] on the page opens it.
    const chatEl = document.getElementById('chat');
    const chat = sheet(chatEl, { pushBack: true, detents: [h => h - innerHeight * .56, () => 0] });
    const form = chatEl.querySelector('form');
    const check = validate(document.getElementById('cContactF'), document.getElementById('cContact'), validContact);
    choices(chatEl.querySelector('.choices'));
    form.querySelectorAll('input,textarea').forEach(f => f.addEventListener('focus', () => chat.expand()));
    form.addEventListener('submit', e => { e.preventDefault(); if (!check()) return; haptic(); chatEl.classList.add('sent'); });
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
      pops.forEach(p => p.open && p.set(false)); mobile && mobile.open && mobile.set(false);
    });
    initQA();
  }

  window.LUFE = { reduce, haptic, clamp, lerp, project, rubberband, nearest, esc, spring, draggable, carousel, segmented, flip, sheet, expand, validate, validContact, choices, initQA, ICON,
    get chat() { return { open: () => document.querySelector('[data-chat]').click() }; } };
  // lufe.js must be the last markup in <body>: chrome is built synchronously so page scripts after it can use LUFE right away.
  initChrome();
})();
