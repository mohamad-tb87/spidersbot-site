// Turns the Claude Design file "Spiders Bot Homepage v3.dc.html" into two
// standalone static pages for spidersbot.com (ar at /, en at /en/).
//
// The design file is a DCLogic/React component: HTML markup with {{ }}
// placeholders, <sc-for>/<sc-if> tags and a script that computes the values.
// A marketing homepage must ship real text in the HTML, so instead of
// shipping React we evaluate the component's renderVals() here, expand the
// template at build time, and hand the few interactive bits to a small
// vanilla runtime that reuses the design's own animation code verbatim.

import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));   // <repo>/build
const SRC = path.join(HERE, 'v3-clean.html');
const OUT = path.join(HERE, '..');                           // <repo>

const src = fs.readFileSync(SRC, 'utf8');

// ---------------------------------------------------------------- slicing
const helmetStyle = src.match(/<style>\n([\s\S]*?)<\/style>/)[1];
const dcScript = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const mStart = src.indexOf('<div ref="{{ rootRef }}"');
const mEnd = src.indexOf('</x-dc>');
if (mStart < 0 || mEnd < 0) throw new Error('markup bounds not found');
let markup = src.slice(mStart, mEnd).trim();          // includes the closing </div>

// --------------------------------------------------- evaluate the component
class DCLogic { constructor(p) { this.props = p || {}; } setState() {} }
const sandbox = { React: { createRef: () => ({ current: null }) }, console, window: {}, DCLogic };
vm.createContext(sandbox);
vm.runInContext(dcScript + '\n;globalThis.__C = Component;', sandbox);

function valsFor(lang, billing, faq) {
  const c = new sandbox.__C();
  c.props = { lang };
  c.state = { lang, billing, faq, menu: false, narrow: false };
  return c.renderVals();
}

// ------------------------------------------------------------ new scenes
// Scenes 06 and 08 were written (full AR/EN copy in both dictionaries) but
// never rendered — which is why the eyebrow numbering ran 1, 2, 4 and why
// "Solutions" had no nav link. Dropping them would also have cost the live
// site two sections it already has. They are plain sections, in the same
// register as Pricing and FAQ, not choreographed scenes.
const SCENE_06 = `
<!-- SCENE 06 · E-COMMERCE -->
<section id="store" data-theme="dark" data-screen-label="06 Commerce" style="position:relative;background:#060E26;color:#fff;padding:120px 5vw;border-top:1px solid rgba(217,223,234,.1)">
  <div style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:48px;align-items:center">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.1em;color:#22CCEE">{{ t.s6Eyebrow }}</div>
      <h2 style="font-size:clamp(30px,3.6vw,48px);line-height:1.15;font-weight:600;margin:14px 0 14px">{{ t.s6Title }}</h2>
      <p style="font-size:clamp(15px,1.2vw,18px);line-height:1.75;color:#C9D1E3;margin:0 0 26px;max-width:46ch">{{ t.s6Sub }}</p>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#C9D1E3"><span style="width:7px;height:7px;border-radius:50%;background:#25D366;flex:none"></span>{{ t.mCod }}</div>
        <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#C9D1E3"><span style="width:7px;height:7px;border-radius:50%;background:#22CCEE;flex:none"></span>{{ t.mFollow }}</div>
        <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#C9D1E3"><span style="width:7px;height:7px;border-radius:50%;background:#2FD6A3;flex:none"></span>{{ t.mOut }}</div>
      </div>
    </div>
    <div style="min-width:0;background:rgba(30,40,64,.6);border:1px solid rgba(217,223,234,.14);border-radius:24px;padding:20px;box-shadow:0 30px 70px rgba(0,0,0,.35)">
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="align-self:flex-start;max-width:82%;background:rgba(217,223,234,.1);border:1px solid rgba(217,223,234,.14);border-radius:16px;padding:12px 14px;font-size:14px;line-height:1.5">{{ t.mQ }}</div>
        <div style="align-self:flex-end;max-width:82%;background:#2B5CFF;color:#fff;border-radius:16px;padding:12px 14px;font-size:14px;line-height:1.5">{{ t.mA }}</div>
        <div style="align-self:flex-end;width:min(100%,300px);background:#0A1A3F;border:1px solid rgba(217,223,234,.16);border-radius:16px;overflow:hidden">
          <div style="height:96px;background:linear-gradient(135deg,rgba(43,92,255,.35),rgba(34,204,238,.22));display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:#A9B4CC">{{ t.mImg }}</div>
          <div style="padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px">
            <span style="font-size:18px;font-weight:600;white-space:nowrap">{{ t.mPrice }}</span>
            <span style="background:#2B5CFF;color:#fff;font-size:12px;font-weight:600;border-radius:10px;padding:8px 12px;white-space:nowrap">{{ t.mAdd }}</span>
          </div>
        </div>
        <div style="align-self:flex-start;max-width:82%;background:rgba(217,223,234,.1);border:1px solid rgba(217,223,234,.14);border-radius:16px;padding:12px 14px;font-size:14px;line-height:1.5">{{ t.mQ2 }}</div>
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding-top:4px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.04em;color:#A9B4CC">
          <span style="border:1px solid rgba(47,214,163,.5);color:#2FD6A3;border-radius:999px;padding:5px 10px">{{ t.mCoupon }}</span>
          <span>{{ t.mCart }}</span>
          <span style="color:#fff;font-weight:600">{{ t.mTotal }}</span>
        </div>
        <div style="margin-top:6px;background:#0A1A3F;border:1px solid rgba(217,223,234,.16);border-radius:16px;padding:14px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:#A9B4CC;margin-bottom:10px">{{ t.mOrderLabel }}</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="border:1px solid rgba(217,223,234,.18);border-radius:10px;padding:10px 12px;font-size:13px;color:#A9B4CC">{{ t.mName }}</div>
            <div style="border:1px solid rgba(217,223,234,.18);border-radius:10px;padding:10px 12px;font-size:13px;color:#A9B4CC">{{ t.mAddress }}</div>
            <div style="margin-top:4px;text-align:center;background:#25D366;color:#042314;font-weight:600;font-size:14px;border-radius:10px;padding:12px">{{ t.mConfirm }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

`;

const SCENE_08 = `
<!-- SCENE 08 · SOLUTIONS -->
<section id="solutions" data-theme="light" data-screen-label="08 Solutions" style="background:#F5F7FB;color:#0A1A3F;padding:120px 5vw;border-top:1px solid #D9DFEA">
  <div style="max-width:1240px;margin:0 auto">
    <div style="max-width:640px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.1em;color:#2B5CFF">{{ t.s8Eyebrow }}</div>
      <h2 style="font-size:clamp(30px,3.6vw,48px);line-height:1.15;font-weight:600;margin:14px 0 14px">{{ t.s8Title }}</h2>
      <p style="font-size:clamp(15px,1.2vw,18px);line-height:1.75;color:#5D6A85;margin:0">{{ t.s8Sub }}</p>
    </div>
    <div class="sol-grid">
      <sc-for list="{{ solutions }}" as="item">
        <article style="background:#fff;border:1px solid #D9DFEA;border-radius:22px;padding:26px;display:flex;flex-direction:column;gap:16px;box-shadow:0 12px 32px rgba(10,26,63,.06)">
          <div dir="ltr" style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;color:#2B5CFF;text-align:start">{{ item.code }}</div>
          <div style="font-size:21px;font-weight:600;line-height:1.3">{{ item.name }}</div>
          <div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:#A9B4CC;margin-bottom:6px">{{ t.solProblem }}</div>
            <div style="font-size:14px;line-height:1.65;color:#5D6A85">{{ item.problem }}</div>
          </div>
          <div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:#A9B4CC;margin-bottom:6px">{{ t.solFlow }}</div>
            <div style="font-size:14px;line-height:1.65;color:#0A1A3F">{{ item.flow }}</div>
          </div>
          <div style="margin-top:auto;border-top:1px solid #EBEFF5;padding-top:14px">
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:#A9B4CC;margin-bottom:6px">{{ t.solOutcome }}</div>
            <div style="display:flex;gap:9px;align-items:flex-start;font-size:14px;line-height:1.65;font-weight:500"><span style="width:7px;height:7px;border-radius:50%;background:#2FD6A3;margin-top:7px;flex:none"></span><span>{{ item.outcome }}</span></div>
          </div>
        </article>
      </sc-for>
    </div>
  </div>
</section>

`;

// ------------------------------------------------------------- rewriting
function rep(s, from, to, expect) {
  const n = s.split(from).length - 1;
  if (n !== expect) throw new Error(`expected ${expect} of ${JSON.stringify(from.slice(0, 70))}, found ${n}`);
  return s.split(from).join(to);
}

// insert the two missing scenes
markup = rep(markup, '<!-- SCENE 07 · COMMAND CENTER (light) -->', SCENE_06.trim() + '\n\n<!-- SCENE 07 · COMMAND CENTER (light) -->', 1);
markup = rep(markup, '<!-- SCENE 09 · PRICING -->', SCENE_08.trim() + '\n\n<!-- SCENE 09 · PRICING -->', 1);

// refs -> data attributes the runtime can find
markup = rep(markup, 'ref="{{ rootRef }}"', 'id="dc-root" data-ref="root"', 1);
markup = rep(markup, 'ref="{{ navRef }}"', 'data-ref="nav"', 1);
markup = rep(markup, 'ref="{{ heroRef }}"', 'data-ref="hero"', 1);
markup = rep(markup, 'ref="{{ heroSecRef }}"', 'data-ref="heroSec"', 1);
markup = rep(markup, 'ref="{{ smarkRef }}"', 'data-ref="smark"', 1);

// the language toggle becomes a real link to the other language's page
markup = rep(markup, '<button onClick="{{ toggleLang }}"', '<a data-langswitch href="__OTHERLANG__"', 2);
markup = rep(markup, '>{{ t.langSwitch }}</button>', '>{{ t.langSwitch }}</a>', 2);

// handlers
markup = rep(markup, 'onClick="{{ toggleMenu }}"', 'type="button" data-click="menu"', 1);
markup = rep(markup, 'onClick="{{ closeMenu }}"', 'data-click="closemenu"', 4);
markup = rep(markup, 'onClick="{{ setMonthly }}"', 'type="button" data-bill="monthly"', 1);
markup = rep(markup, 'onClick="{{ setYearly }}"', 'type="button" data-bill="yearly"', 1);
markup = rep(markup, 'onClick="{{ item.toggle }}"', 'type="button" data-click="faq" data-faq="{{ $index }}"', 1);

// hooks for the bits that change after load
markup = rep(markup,
  `<span style="font-family:'Sora','Readex Pro',sans-serif;font-size:44px;font-weight:600;letter-spacing:-0.02em;white-space:nowrap">{{ item.price }}</span>`,
  `<span data-price="{{ $index }}" style="font-family:'Sora','Readex Pro',sans-serif;font-size:44px;font-weight:600;letter-spacing:-0.02em;white-space:nowrap">{{ item.price }}</span>`, 1);
markup = rep(markup,
  `<div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.04em;color:{{ item.muted }}">{{ item.note }}</div>`,
  `<div data-note style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.04em;color:{{ item.muted }}">{{ item.note }}</div>`, 1);
markup = rep(markup,
  `<span aria-hidden="true" style="font-family:'JetBrains Mono',monospace;font-size:18px;color:#2B5CFF;flex:none">{{ item.icon }}</span>`,
  `<span data-faqicon aria-hidden="true" style="font-family:'JetBrains Mono',monospace;font-size:18px;color:#2B5CFF;flex:none">{{ item.icon }}</span>`, 1);
// the dashboard date is computed, never baked
markup = rep(markup,
  `<div style="font-size:11px;color:#5D6A85;margin-top:2px">{{ t.dbDate }}</div>`,
  `<div data-dbdate style="font-size:11px;color:#5D6A85;margin-top:2px">{{ t.dbDate }}</div>`, 1);

// the one responsive value that was computed in JS becomes a media query
markup = rep(markup,
  `<div style="position:sticky;top:0;height:100vh;overflow:hidden;display:grid;grid-template-columns:{{ bCols }};`,
  `<div data-bcols style="position:sticky;top:0;height:100vh;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);`, 1);

// Solutions now exists, so it gets its nav entry (the copy was already there)
markup = rep(markup,
  `      <a href="#pricing" style="color:inherit;opacity:.85" style-hover="opacity:1">{{ t.navPricing }}</a>`,
  `      <a href="#solutions" style="color:inherit;opacity:.85" style-hover="opacity:1">{{ t.navSolutions }}</a>\n      <a href="#pricing" style="color:inherit;opacity:.85" style-hover="opacity:1">{{ t.navPricing }}</a>`, 1);
markup = rep(markup,
  `    <a data-click="closemenu" href="#pricing" style="color:#fff;font-size:24px;font-weight:500;padding:14px 0;border-bottom:1px solid rgba(217,223,234,.12)">{{ t.navPricing }}</a>`,
  `    <a data-click="closemenu" href="#solutions" style="color:#fff;font-size:24px;font-weight:500;padding:14px 0;border-bottom:1px solid rgba(217,223,234,.12)">{{ t.navSolutions }}</a>\n    <a data-click="closemenu" href="#pricing" style="color:#fff;font-size:24px;font-weight:500;padding:14px 0;border-bottom:1px solid rgba(217,223,234,.12)">{{ t.navPricing }}</a>`, 1);

// editor-only hints
markup = rep(markup,
  '<div style="display:grid;grid-template-columns:200px minmax(0,1fr)">',
  '<div data-dashgrid style="display:grid;grid-template-columns:200px minmax(0,1fr)">', 1);

markup = rep(markup,
  '<div style="width:220px;height:36px;border:1px solid #E6EAF2;border-radius:999px;background:#fff;padding:0 14px;display:flex;align-items:center;font-size:12px;color:#8A94AB">',
  '<div data-dbsearch style="width:220px;height:36px;border:1px solid #E6EAF2;border-radius:999px;background:#fff;padding:0 14px;display:flex;align-items:center;font-size:12px;color:#8A94AB">', 1);

markup = markup.replace(/\s+hint-placeholder-(?:val|count)="[^"]*"/g, '');

// style-hover -> real CSS classes
const hoverMap = new Map();
markup = markup.replace(/\s+style-hover="([^"]*)"/g, (_, decl) => {
  if (!hoverMap.has(decl)) hoverMap.set(decl, 'hv' + hoverMap.size);
  return ` class="${hoverMap.get(decl)}"`;
});
const hoverCss = [...hoverMap].map(([decl, cls]) => `.${cls}:hover{${decl}}`).join('\n');

// ------------------------------------------------------------- rendering
const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function resolve(expr, scope) {
  expr = expr.trim();
  if (expr === 'true') return true;
  if (expr === 'false') return false;
  const parts = expr.split('.');
  let v = scope[parts[0]];
  for (let i = 1; i < parts.length; i++) v = v == null ? v : v[parts[i]];
  return v;
}

const subst = (text, scope) => text.replace(/\{\{([^}]+)\}\}/g, (_, e) => {
  const v = resolve(e, scope);
  if (v === undefined) throw new Error('unresolved placeholder: ' + e.trim());
  return esc(v);
});

function matchClose(tpl, tag, from) {
  const re = new RegExp('<\\/?' + tag + '\\b', 'g');
  re.lastIndex = from;
  let depth = 1, m;
  while ((m = re.exec(tpl))) {
    if (tpl[m.index + 1] === '/') { if (--depth === 0) return m.index; }
    else depth++;
  }
  throw new Error('unclosed <' + tag + '>');
}

function render(tpl, scope) {
  let out = '', i = 0;
  for (;;) {
    const nf = tpl.indexOf('<sc-for', i), ni = tpl.indexOf('<sc-if', i);
    let at = -1, tag = '';
    if (nf >= 0 && (ni < 0 || nf < ni)) { at = nf; tag = 'sc-for'; }
    else if (ni >= 0) { at = ni; tag = 'sc-if'; }
    if (at < 0) { out += subst(tpl.slice(i), scope); return out; }

    out += subst(tpl.slice(i, at), scope);
    const openEnd = tpl.indexOf('>', at) + 1;
    const open = tpl.slice(at, openEnd);
    const close = matchClose(tpl, tag, openEnd);
    const inner = tpl.slice(openEnd, close);
    i = close + ('</' + tag + '>').length;

    if (tag === 'sc-for') {
      const list = resolve(open.match(/list="\{\{([^}]+)\}\}"/)[1], scope);
      const as = open.match(/as="([^"]+)"/)[1];
      list.forEach((item, idx) => { out += render(inner, { ...scope, [as]: item, $index: idx }); });
    } else {
      const expr = open.match(/value="\{\{([^}]+)\}\}"/)[1].trim();
      if (expr === 'wide') out += `<span class="dc-wide" style="display:contents">${render(inner, scope)}</span>`;
      else if (expr === 'narrow') out += `<span class="dc-narrow" style="display:contents">${render(inner, scope)}</span>`;
      else if (expr === 'menuOpen') out += `<div id="dc-menu" hidden>${render(inner, scope)}</div>`;
      else if (expr === 'item.open') out += `<div class="dc-faq-a" data-faqa="${scope.$index}"${scope.$index === 0 ? '' : ' hidden'}>${render(inner, scope)}</div>`;
      else if (resolve(expr, scope)) out += render(inner, scope);
    }
  }
}

// ------------------------------------------------------------ the runtime
// Everything from `const PRICES` to `class Component` is the design's own
// data and maths (TRACKS, interp, the anchors). It is carried over verbatim;
// only the React component around it is replaced.
const sharedConsts = dcScript.slice(dcScript.indexOf('const PRICES'), dcScript.indexOf('class Component'));

const runtime = lang => `
(function () {
'use strict';
${sharedConsts}
var LANG = ${JSON.stringify(lang)}, RTL = LANG === 'ar';
var BILL = __BILL__;

var root = document.getElementById('dc-root');
var nav = document.querySelector('[data-ref="nav"]');
var smark = document.querySelector('[data-ref="smark"]');
var hero = document.querySelector('[data-ref="hero"]');
var heroSec = document.querySelector('[data-ref="heroSec"]');
if (!root) return;

var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var scenes = [], raf = 0, flowRaf = 0, heroP = 0, outPathEl = null;
var theme, atTop, smDark, smPct, lastH, menu = false, billing = 'monthly', faqOpen = 0;

/* ---- the date in the dashboard mock is today's, not the day this was built */
var dateEl = document.querySelector('[data-dbdate]');
if (dateEl) dateEl.textContent = todayLabel(LANG);

/* ---- scene measurement + animation tracks (design code, refs rebound) ---- */
function setup() {
  var vh = innerHeight, narrow = innerWidth < 880;
  scenes = [].slice.call(root.querySelectorAll('[data-scene]')).map(function (el) {
    var pin = parseFloat(el.dataset.pin || '0');
    if (pin) {
      if (reduced) { el.style.height = 'auto'; var st = el.firstElementChild; st.style.position = 'relative'; st.style.height = 'auto'; st.style.minHeight = '100vh'; }
      else el.style.height = Math.max(1.3, narrow ? pin * 0.65 : pin) * 100 + 'vh';
    }
    var tracks = TRACKS[el.dataset.scene] || {}, items = [];
    for (var key in tracks) {
      /* jshint loopfunc:true */
      (function (key) {
        el.querySelectorAll('[data-a="' + key + '"]').forEach(function (node) {
          if (node.hasAttribute('data-draw')) { var L = node.getTotalLength(); node.__len = L; node.style.strokeDasharray = L; }
          if (node.dataset.path) node.__path = el.querySelector('#' + node.dataset.path);
          if (!(node instanceof SVGElement)) node.style.willChange = 'transform,opacity';
          items.push({ node: node, kfs: tracks[key] });
        });
      })(key);
    }
    return { el: el, pin: pin, items: items, last: null, fit: el.querySelector('[data-fit]') };
  });
  root.querySelectorAll('[data-fit]').forEach(function (fit) {
    var w = +fit.dataset.w, h = +fit.dataset.h;
    var grid = fit.parentElement, gcs = getComputedStyle(grid);
    var cols = gcs.display === 'grid' ? gcs.gridTemplateColumns.split(' ').filter(Boolean).length : 1;
    var stacked = cols < 2;
    var copy = grid.querySelector('[data-a$="-copy"]');
    var padTop = parseFloat(gcs.paddingTop) || 0;
    var inner = grid.clientWidth - (parseFloat(gcs.paddingLeft) || 0) - (parseFloat(gcs.paddingRight) || 0);
    var availW = stacked ? inner - 2 : fit.hasAttribute('data-wide') ? (inner - 32) * 2 / 3 - 2 : (inner - 32) / 2 - 2;
    var availH = stacked ? vh - padTop - (copy ? copy.offsetHeight : 0) - 64 - (innerWidth < 880 ? 60 : 0) : vh - padTop - 56;

    /* على الهاتف لا يُملى المقياسُ بالعرض وحده.
     *
     * المشهد لوحةٌ عرضها ٦٤٠ إلى ٨٢٠ بكسل، فملاءمتها لعرض ٣٤٣ تعني
     * مقياس ٠٫٥٢ أو أقلّ — ونصُّ البطاقات عندها خمسة بكسلات: اللوحة
     * كاملةٌ ولا تُقرأ، وهذا ليس حفظاً للفكرة بل صورةٌ عنها.
     *
     * فنُلائم الارتفاع (وهو القيد الحقيقي داخل مشهدٍ مثبَّت بارتفاع
     * الشاشة)، ونسمح بزيادةٍ عرضيّةٍ تُمرَّر بالإصبع لا تتجاوز ١٧٠
     * بكسلاً — فيبقى ثلثا اللوحة مرئيين عند أول نظرة.                */
    var phone = innerWidth < 700;
    if (phone) availH = vh - padTop - (copy ? copy.offsetHeight : 0) - 28;

    var k = phone
      ? Math.min(1, availH / h, (availW + 170) / w)
      : Math.min(1, availW / w, availH / h);

    fit.__w = w; fit.__h = h; fit.__availW = availW;
    fit.__k = Math.max(0.3, k);
    fit.__shift = 0;
    fit.__lastP = undefined;
    applyFit(fit);
  });

  /* الاستكشاف قبل العرض لا أثناءه.
     لو تُرك القياس للتمرير وحده، رأى الزائر اللوحة تُصغَّر تحت عينه
     حين يبلغ المشهدُ لحظته القصوى. فنُشغّل الحركة هنا على ستّ لقطات
     بلا رسمٍ بينها — فالقياس يتمّ والتصحيح يثبت قبل أن يُرى شيء.    */
  scenes.forEach(function (sc) {
    if (!sc.fit) return;
    for (var t = 0.35; t < 1.01; t += 0.13) {
      for (var j = 0; j < sc.items.length; j++) apply(sc.items[j].node, interp(sc.items[j].kfs, t), RTL);
      sc.fit.__lastP = undefined;
      settleFit(sc.fit, t);
    }
    sc.last = null;   // فالحالة الحقيقية تُعاد في أول tick
  });
}

/* رسمُ الملاءمة: مقياسٌ وإزاحةٌ وحاشيةُ تمرير، من حالةٍ محفوظة.
   فُصلت عن الحساب لأن settleFit يُعيد الرسم بقيمٍ مصحّحة.            */
function applyFit(fit) {
  var k = fit.__k, w = fit.__w, h = fit.__h, availW = fit.__availW, shift = fit.__shift || 0;
  var contentW = (w + shift) * k;

  fit.style.width = Math.min(contentW, availW) + 'px';
  fit.style.height = h * k + 'px';
  fit.firstElementChild.style.transform =
    (shift ? 'translateX(' + (shift * k) + 'px) ' : '') + 'scale(' + k + ')';

  /* التمرير الأفقي: الطبقة المقيسة مطلقةُ الموضع، فلا تُنشئ فيضاً
     يُمرَّر بنفسها — حاشيةٌ بعرض اللوحة المقيسة هي ما يمنح الصندوق
     محتوىً يُمرَّر، والطبقةُ تطفو فوقها وتتحرّك معها.                */
  var spacer = fit.querySelector('[data-pan-spacer]');
  if (contentW > availW + 1) {
    fit.style.overflowX = 'auto'; fit.style.overflowY = 'hidden';
    fit.setAttribute('data-panned', '');
    if (!spacer) {
      spacer = document.createElement('i');
      spacer.setAttribute('data-pan-spacer', '');
      spacer.style.cssText = 'display:block;height:1px;flex:none';
      fit.appendChild(spacer);
    }
    spacer.style.width = contentW + 'px';

    /* يُفتَح المشهد على وسط اللوحة لا على طرفها. وطريقة التوسيط
       تختلف باختلاف المتصفّح في الاتجاه من اليمين إلى اليسار: بعضها
       يجعل الصفر عند اليمين والسالب يساراً، وبعضها الصفر عند اليسار.
       فنجرّب الموجب، فإن لم يتحرّك فهو المذهب الآخر.
       ولا يُعاد التوسيط إلّا إن تغيّر مقدار التمرير، فإعادةُ ضبطه في
       كلّ setup() (والخطوط تُحمَّل فتستدعيه) تخطف اللوحة من يد من
       يسحبها.                                                        */
    var span = Math.max(0, contentW - availW);
    if (fit.__pan !== span) {
      fit.__pan = span;
      fit.scrollLeft = span / 2;
      if (fit.scrollLeft === 0 && span > 0) fit.scrollLeft = -span / 2;
    }
  } else {
    fit.__pan = 0;
    fit.style.overflowX = ''; fit.style.overflowY = '';
    fit.removeAttribute('data-panned');
    if (spacer) spacer.remove();
  }
}

/* تصحيحٌ بعد الاستقرار: اللوحة قد تتجاوز صندوقها المُعلَن.
 *
 * data-w يصف الصندوق المرسوم، لكن التحريك يُزيح بطاقاتٍ خارجه —
 * في مشهد «من تعليق إلى رسالة» تستقرّ بطاقةٌ على بعد مئة بكسلٍ قبل
 * حافّة الصندوق. على شاشةٍ عريضة لا يُلاحَظ، وعلى اللوحيّ تُقصّ عند
 * حافّة النافذة. والقصّ من جهة البداية في صفحةٍ من اليمين إلى اليسار
 * لا يُنشئ شريط تمريرٍ يكشفه: يختفي ثلث البطاقة بصمت.
 *
 * فبدل أن نخمّن مقدار التجاوز لكلّ مشهد ونُجمّده رقماً، نقيسه مرّةً
 * بعد أن يستقرّ المشهد: إن تجاوز، صُغِّر المقياس بنسبة التجاوز
 * (والصندوق يضيق فيتوسّط أكثر، فيعود المُزاح إلى الشاشة)؛ وإن كانت
 * اللوحة ممرَّرةً أصلاً أُزيحت داخل صندوقها وزِيد مدى التمرير.
 *
 * القياس من الواقع لا من جدول، فتعديلُ التصميم لاحقاً يُصحَّح وحده.  */
function settleFit(fit, p) {
  /* القياس يتكرّر على طول المشهد لا مرّةً واحدة.
     الإزاحة عابرة: البطاقة تبلغ أقصى بُعدها في منتصف المشهد ثم تعود
     قليلاً، فقياسٌ واحدٌ عند عتبةٍ بعينها يرى لحظةً لا القصّة. ولأن
     كلّ تصحيحٍ يُصغّر ولا يُكبّر، تستقرّ القيمة عند أسوأ لحظةٍ مرّت
     ولا تتذبذب. والقياس مخنوقٌ بفارق ٣٪ من تقدّم المشهد، فلا يُقاس
     في كلّ إطار.                                                    */
  if (fit.__lastP !== undefined && Math.abs(p - fit.__lastP) < 0.03) return;
  fit.__lastP = p;

  var box = fit.getBoundingClientRect(), minL = box.left, maxR = box.right;
  fit.querySelectorAll('*').forEach(function (n) {
    if (n.hasAttribute && n.hasAttribute('data-pan-spacer')) return;
    var r = n.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    /* الشفّاف لا يُحسَب: البطاقات تدخل المشهد من خارجه وهي غير مرئية،
       فقياسُها في لحظة الدخول يُضخّم حدود اللوحة بما لا يراه أحد —
       فيُصغَّر المشهد كلّه لأجل شبحٍ عابر.                          */
    if (+getComputedStyle(n).opacity < 0.5) return;
    if (r.left < minL) minL = r.left;
    if (r.right > maxR) maxR = r.right;
  });

  if (fit.hasAttribute('data-panned')) {
    /* الإزاحة محدودةٌ بثمانين بكسلاً من إحداثيات اللوحة: زيادتها
       بلا حدٍّ تُطيل التمرير حتى يصير المشهد شريطاً يُسحب، وقد
       قرّرنا ألّا يغيب منه أكثر من الثلث.                           */
    var need = box.left - minL;
    if (need > 1) {
      fit.__shift = Math.min(80, fit.__shift + need / fit.__k);
      applyFit(fit);
    }
    return;
  }

  /* الحدّ بكسلان لا ثمانية: على الشاشة العريضة تقترب البطاقة المُزاحة
     من الحافّة عمداً في التصميم، فحدٌّ متسامحٌ يُصغّر اللوحة على سطح
     المكتب بلا داعٍ — والمطلوب إنقاذُ ما يُقصّ لا إعادةُ تنضيد ما
     صُمّم.                                                          */
  var needL = 2 - minL, needR = maxR - (innerWidth - 2);
  if (needL <= 1 && needR <= 1) return;

  /* المقياس يُحَلّ مباشرةً لا يُنقَص بنسبة التجاوز.
     التجاوز من جهةٍ واحدة، فقسمةُ المدى على المتاح تُنقص المقياس
     قُضاضةً صغيرة كلّ مرّة ولا تبلغ الحلّ. والعلاقة معروفة:
     الصندوق يثبت بطرفٍ ويضيق من الآخر، فعرضُ اللوحة مع تجاوزها
     يجب أن يسع ما بين ذلك الطرف وحافّة الشاشة.                     */
  var bleedL = Math.max(0, box.left - minL) / fit.__k;
  var bleedR = Math.max(0, maxR - box.right) / fit.__k;
  var kL = needL > 1 ? (box.right - 2) / (fit.__w + bleedL) : fit.__k;
  var kR = needR > 1 ? ((innerWidth - 2) - box.left) / (fit.__w + bleedR) : fit.__k;

  fit.__k = Math.max(0.3, Math.min(fit.__k, kL, kR));
  applyFit(fit);
}

function req() { if (!raf) raf = requestAnimationFrame(tick); }

function tick() {
  raf = 0;
  var vh = innerHeight;
  for (var i = 0; i < scenes.length; i++) {
    var sc = scenes[i], r = sc.el.getBoundingClientRect(), p;
    if (reduced) p = 1;
    else if (sc.pin) p = clamp01(-r.top / Math.max(1, sc.el.offsetHeight - vh));
    else p = clamp01((vh * 0.92 - r.top) / (vh * 0.55));
    if (sc.last === p) continue;
    sc.last = p;
    for (var j = 0; j < sc.items.length; j++) apply(sc.items[j].node, interp(sc.items[j].kfs, p), RTL);
    if (sc.fit && p > 0.2) settleFit(sc.fit, p);
  }
  navTheme();
  smarkTick();
}

function apply(node, v, rtl) {
  if ('along' in v && node.__path) { var L = node.__path.getTotalLength(); var pt = node.__path.getPointAtLength(L * clamp01(v.along)); node.setAttribute('cx', pt.x); node.setAttribute('cy', pt.y); }
  if ('draw' in v) node.style.strokeDashoffset = (node.__len || 0) * (1 - clamp01(v.draw));
  if ('clip' in v) { var rest = (1 - clamp01(v.clip)) * 100; node.style.clipPath = rtl ? 'inset(0 0 0 ' + rest + '%)' : 'inset(0 ' + rest + '% 0 0)'; }
  if ('o' in v) node.style.opacity = v.o;
  if (!rtl && node.dataset.a && node.dataset.a.slice(-6) === '-stage') { if (v.x) v.x = -v.x; if (v.ry) v.ry = -v.ry; }
  if ('x' in v || 'y' in v || 'z' in v || 'rx' in v || 'ry' in v || 'rz' in v || 's' in v) {
    node.style.transform = 'translate3d(' + (v.x || 0) + 'px,' + (v.y || 0) + 'px,' + (v.z || 0) + 'px) rotateX(' + (v.rx || 0) + 'deg) rotateY(' + (v.ry || 0) + 'deg) rotateZ(' + (v.rz || 0) + 'deg) scale(' + (v.s == null ? 1 : v.s) + ')';
  }
}

function navTheme() {
  if (!nav) return;
  var th = 'dark', list = root.querySelectorAll('[data-theme]');
  for (var i = 0; i < list.length; i++) { var r = list[i].getBoundingClientRect(); if (r.top <= 36 && r.bottom > 36) { th = list[i].dataset.theme; break; } }
  var top = scrollY < 24;
  if (th !== theme || top !== atTop) {
    theme = th; atTop = top;
    var dark = th === 'dark';
    nav.style.color = dark ? '#fff' : '#0A1A3F';
    nav.style.background = top ? 'rgba(6,14,38,0)' : dark ? 'rgba(6,14,38,.72)' : 'rgba(255,255,255,.82)';
    nav.style.borderBottomColor = top ? 'transparent' : dark ? 'rgba(217,223,234,.12)' : '#D9DFEA';
    nav.querySelectorAll('[data-ring]').forEach(function (c) { c.setAttribute('stroke', dark ? '#060E26' : '#FFFFFF'); });
  }
}

function smarkTick() {
  if (!smark) return;
  var max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  var p = clamp01(scrollY / max);
  var prog = smark.querySelector('[data-sm="prog"]');
  if (prog) prog.style.strokeDashoffset = 148 * (1 - p);
  var dark = theme !== 'light';
  if (dark !== smDark) {
    smDark = dark;
    smark.querySelector('[data-sm="track"]').setAttribute('stroke', dark ? 'rgba(217,223,234,.16)' : 'rgba(10,26,63,.12)');
    smark.querySelector('[data-sm="hub"]').setAttribute('stroke', dark ? '#060E26' : '#FFFFFF');
    smark.querySelectorAll('[data-sm="n1"],[data-sm="n2"]').forEach(function (n) { n.setAttribute('fill', dark ? 'rgba(217,223,234,.35)' : 'rgba(10,26,63,.25)'); });
    smark.querySelector('[data-sm="label"]').style.color = dark ? '#A9B4CC' : '#5D6A85';
  }
  var n2 = smark.querySelector('[data-sm="n2"]');
  if (n2) n2.setAttribute('fill', p > .985 ? '#2FD6A3' : (dark ? 'rgba(217,223,234,.35)' : 'rgba(10,26,63,.25)'));
  var inFooter = root.querySelector('footer').getBoundingClientRect().top < innerHeight * .6;
  var small = innerWidth < 880, clash = false;
  if (!inFooter) {
    var er = smark.getBoundingClientRect(), cs = root.querySelectorAll('a,button');
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i]; if (c.closest('[data-smark]')) continue;
      var r = c.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
      if (r.left < er.right && r.right > er.left && r.top < er.bottom && r.bottom > er.top) { clash = true; break; }
    }
  }
  smark.style.opacity = (inFooter || clash || (small && menu)) ? '0' : '1';
  smark.style.transform = small ? 'scale(.55)' : 'scale(1)';
  smark.style.transformOrigin = RTL ? 'bottom right' : 'bottom left';
  var pct = Math.round(p * 100), label = smark.querySelector('[data-sm="label"]');
  if (label && smPct !== pct) { smPct = pct; label.textContent = (RTL ? arDigits(pct) + '٪' : pct + '%'); }
}

/* ---- the hero's eight threads travelling into the hub ---- */
function startFlow() {
  if (reduced) {
    if (heroSec) { heroSec.style.height = 'auto'; var st0 = heroSec.firstElementChild; st0.style.position = 'relative'; st0.style.height = 'auto'; st0.style.minHeight = '100vh'; }
    heroP = 1;
  }
  var PERIOD = 9000, N = 8, SPAN = .5, STAG = (1 - SPAN) / (N - 1);
  var easeIO = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  function tickFlow() {
    flowRaf = requestAnimationFrame(tickFlow);
    if (!hero) return;
    if (reduced) heroP = 1;
    if (document.hidden) return;
    var r = hero.getBoundingClientRect();
    if (r.bottom < -innerHeight || r.top > innerHeight * 2) return;
    if (!heroSec) return;
    heroSec.style.height = (innerWidth < 880 ? 200 : 280) + 'vh';
    var sr = heroSec.getBoundingClientRect();
    var target = clamp01(-sr.top / Math.max(1, heroSec.offsetHeight - innerHeight));
    if (!reduced) heroP += (target - heroP) * .14;
    if (Math.abs(target - heroP) < .0005) heroP = target;
    var T = heroP, arrived = 0, hot = 0;
    for (var i = 0; i < N; i++) {
      var path = hero.querySelector('[data-th="' + i + '"]'), dot = hero.querySelector('[data-dot="' + i + '"]'), card = hero.querySelector('[data-card="' + i + '"]');
      if (!path || !dot || !card) continue;
      var L = path.getTotalLength(); if (!L) continue;
      var local = (T - i * STAG) / SPAN;
      var pre = clamp01((T - i * STAG + .08) / .08);
      if (local >= 0 && local <= 1) {
        var p = easeIO(local), pt = path.getPointAtLength(L * p);
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); dot.setAttribute('opacity', p < .92 ? 1 : (1 - p) / .08);
        path.style.strokeDasharray = L; path.style.strokeDashoffset = L * (1 - p); path.setAttribute('stroke', '#22CCEE'); path.style.opacity = .9;
        if (p > .9) hot++;
      } else {
        dot.setAttribute('opacity', 0);
        var done = local > 1;
        path.setAttribute('stroke', done ? 'rgba(34,204,238,.45)' : 'rgba(217,223,234,.18)');
        path.style.strokeDasharray = ''; path.style.strokeDashoffset = 0; path.style.opacity = 1;
        if (done) arrived++;
      }
      var lift = local >= 0 && local <= 1 ? Math.sin(Math.PI * clamp01(local)) : 0;
      var dim = local > 1 ? .55 : 1;
      card.style.opacity = .55 + .45 * Math.max(pre, 0) * dim;
      card.style.transform = 'translateX(' + ((RTL ? -1 : 1) * lift * 6) + 'px) scale(' + (1 + lift * .03) + ')';
      card.style.borderColor = local >= 0 && local <= 1 ? 'rgba(34,204,238,.55)' : (local > 1 ? 'rgba(34,204,238,.25)' : 'rgba(217,223,234,.16)');
      if (T < i * STAG - .02) card.style.opacity = .55;
    }
    var ring = hero.querySelector('[data-hubring]');
    if (ring) { var g = Math.min(1, hot / 2); ring.style.boxShadow = '0 0 0 ' + (g * 10) + 'px rgba(34,204,238,' + (.22 * g) + '), 0 0 ' + (30 + g * 40) + 'px rgba(34,204,238,' + (.15 + g * .35) + ')'; }
    var out = hero.querySelector('[data-out]');
    if (out) {
      if (!outPathEl) { outPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path'); outPathEl.setAttribute('d', 'M490 326V404'); }
      var OL = outPathEl.getTotalLength(), ot = (T * N) % 1, pt2 = outPathEl.getPointAtLength(OL * ot);
      out.setAttribute('cx', pt2.x); out.setAttribute('cy', pt2.y);
      out.setAttribute('opacity', T > .12 && T < .999 && ot > .05 && ot < .95 ? 1 : 0);
    }
    hero.querySelectorAll('[data-br]').forEach(function (d, j) {
      var on = ((Math.floor(T * N * 2) + j) % 4) === 0 && hot > 0;
      d.style.background = on ? '#22CCEE' : '#5D6A85';
      d.style.boxShadow = on ? '0 0 8px #22CCEE' : 'none';
    });
    var cnt = hero.querySelector('[data-leadcount]');
    if (cnt) { var n = Math.min(N, Math.floor(T * N + .5)); var txt = RTL ? arDigits(n) : String(n); if (cnt.textContent !== txt) cnt.textContent = txt; }
  }
  flowRaf = requestAnimationFrame(tickFlow);
}

function intro() {
  if (reduced) return;
  var els = [].slice.call(root.querySelectorAll('[data-reveal]'));
  els.forEach(function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(22px)'; });
  void root.offsetHeight;
  setTimeout(function () {
    els.forEach(function (el, i) {
      el.style.transition = 'opacity .8s cubic-bezier(.2,.7,.2,1) ' + (i * .09) + 's, transform .8s cubic-bezier(.2,.7,.2,1) ' + (i * .09) + 's';
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
  }, 30);
  setTimeout(function () { els.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }); }, 2500);
}

/* ---- the three things that change after load ---- */
var menuEl = document.getElementById('dc-menu');
var menuBtn = document.querySelector('[data-click="menu"]');
function setMenu(v) {
  menu = v;
  if (menuEl) menuEl.hidden = !v;
  if (menuBtn) menuBtn.setAttribute('aria-expanded', String(v));
  document.documentElement.style.overflow = v ? 'hidden' : '';
}
if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(!menu); });
document.querySelectorAll('[data-click="closemenu"]').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

document.querySelectorAll('[data-bill]').forEach(function (b) {
  b.addEventListener('click', function () {
    billing = b.dataset.bill;
    var d = BILL[billing], on = { bg: '#fff', fg: '#0A1A3F', sh: '0 2px 8px rgba(10,26,63,.12)' }, off = { bg: 'transparent', fg: '#5D6A85', sh: 'none' };
    document.querySelectorAll('[data-bill]').forEach(function (x) {
      var s = x.dataset.bill === billing ? on : off;
      x.style.background = s.bg; x.style.color = s.fg; x.style.boxShadow = s.sh;
      x.setAttribute('aria-pressed', String(x.dataset.bill === billing));
    });
    document.querySelectorAll('[data-price]').forEach(function (p) { p.textContent = d.prices[+p.dataset.price]; });
    document.querySelectorAll('[data-note]').forEach(function (n) { n.textContent = d.note; });
    setup(); req();
  });
});

document.querySelectorAll('[data-click="faq"]').forEach(function (b) {
  b.addEventListener('click', function () {
    var i = +b.dataset.faq;
    faqOpen = faqOpen === i ? -1 : i;
    document.querySelectorAll('[data-click="faq"]').forEach(function (x) {
      var open = +x.dataset.faq === faqOpen;
      x.setAttribute('aria-expanded', String(open));
      x.querySelector('[data-faqicon]').textContent = open ? '−' : '+';
    });
    document.querySelectorAll('[data-faqa]').forEach(function (a) { a.hidden = +a.dataset.faqa !== faqOpen; });
    setup(); req();
  });
});

/* the overlay belongs to the narrow layout; widening the window closes it */
function onResize() { if (menu && innerWidth >= 880) setMenu(false); setup(); req(); }

setup();
addEventListener('resize', onResize);
addEventListener('scroll', req, { passive: true });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setup(); req(); });
req(); intro(); startFlow();
[300, 1000, 2500].forEach(function (ms) { setTimeout(function () { setup(); req(); }, ms); });
if (window.ResizeObserver) {
  new ResizeObserver(function () { var h = root.scrollHeight; if (h !== lastH) { lastH = h; setup(); req(); } }).observe(root);
}
})();
`;

// ------------------------------------------------------------------ pages
const extraCss = `
${hoverCss}
a[data-langswitch]{display:inline-flex;align-items:center;justify-content:center;text-decoration:none}
#dc-menu[hidden]{display:none}
.dc-faq-a[hidden]{display:none}
.dc-narrow{display:none!important}
.sol-grid{display:grid;gap:20px;margin-top:40px;align-items:stretch;grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:700px){.sol-grid{grid-template-columns:minmax(0,1fr)}}
@media (min-width:1100px){.sol-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:879px){
  .dc-wide{display:none!important}
  .dc-narrow{display:contents!important}
  [data-bcols]{grid-template-columns:minmax(0,1fr)!important}
}

/* لوحة التحكّم في المشهد ٠٧ شبكةٌ من شريطٍ جانبيّ بعرض ٢٠٠ بكسل وصدرٍ
   مرن. دون ٨٨٠ بكسل لا يبقى للصدر ما يكفي، فيفيض ثمانيةٌ وستّون عنصراً
   خارج الشاشة — ولأن الصفحة من اليمين إلى اليسار، يخرج الفائض من جهة
   البداية فلا يُنشئ شريط تمريرٍ يكشفه: يُقصّ بصمتٍ ولا يراه أحد.
   فالشريط الجانبيّ يُطوى كما يُطوى في أي لوحةٍ حقيقية على الهاتف.      */
@media (max-width:879px){
  [data-dashgrid]{grid-template-columns:minmax(0,1fr)!important}
  [data-dashgrid] > aside{display:none!important}
  /* حقل البحث عرضه ٢٢٠ بكسلاً، لكنه عنصرُ فليكس يحمل نصّاً فلا ينزل
     تحت عرض نصّه (min-width:auto) — فيتمدّد إلى ٣١٢ ويدفع الصفّ خارج
     الشاشة. فنسمح له بالانكماش ونقصّ نصّه بثلاث نقاط.                */
  [data-dbsearch]{
    min-width:0!important; width:auto!important; flex:1 1 120px;
    display:block!important; line-height:34px;
    overflow:hidden; white-space:nowrap; text-overflow:ellipsis;
  }
  /* ومجموعةُ البحث والصور تأخذ سطراً كاملاً فتنكمش داخله. وبلا هذا
     تبقى المجموعة بعرض محتواها فتخرج من الشاشة — وهو ما كان يحدث في
     النسخة الإنجليزية وحدها، لأن نصّها أطول.                        */
  [data-dashgrid] main > div:first-child{flex-wrap:wrap}
  [data-dashgrid] main > div:first-child > div{min-width:0}
  [data-dashgrid] main > div:first-child > div:last-child{flex:1 1 100%}
}

/* على الهاتف تُقلَّص حشوة المشهد العليا: هي لتجاوز الشريط الثابت،
   والشريط أقصر على الهاتف. وكلّ بكسلٍ يُستردّ هنا يذهب إلى مقياس
   اللوحة، فالارتفاع هو القيد داخل مشهدٍ مثبَّت بارتفاع الشاشة.       */
@media (max-width:700px){
  section[data-scene] > div:first-child{padding-top:84px!important}
}

/* لوحةٌ أعرض من الشاشة تُمرَّر بالإصبع بدل أن تُصغَّر حتى تُقرأ.
   والحافّة تتلاشى لتقول إن وراءها بقيّة — فالمقصوص بحدٍّ حادّ يبدو
   خطأً، والمتلاشي يبدو دعوة.                                          */
[data-panned]{
  overscroll-behavior-x:contain;
  scrollbar-width:none;
  -webkit-mask-image:linear-gradient(to left,transparent 0,#000 18px,#000 calc(100% - 18px),transparent 100%);
  mask-image:linear-gradient(to left,transparent 0,#000 18px,#000 calc(100% - 18px),transparent 100%);
}
[data-panned]::-webkit-scrollbar{display:none}
@media (prefers-reduced-motion:reduce){
  [data-a],[data-reveal]{transition:none!important}
}
`;

const META = {
  ar: {
    dir: 'rtl', other: '/en/', assets: 'assets', canonical: 'https://spidersbot.com/',
    locale: 'ar_AR', siteName: 'سبايدرز بوت',
    title: 'سبايدرز بوت | أتمتة واتساب وماسنجر ومتجر شات ومبيعات',
    desc: 'أتمتة محادثات واتساب وماسنجر وإنستغرام بلا كود، متجر داخل الشات بالدفع عند الاستلام، وحملات تسويقية ذكية. جرّب سبايدرز بوت مجاناً 7 أيام بدون بطاقة.',
    ogDesc: 'منصة واحدة تدير تواصلك ومبيعاتك وتسويقك: أتمتة بلا كود، متجر داخل الشات بالدفع عند الاستلام، وحملات ذكية. ابدأ مجاناً 7 أيام.',
    keywords: 'سبايدرز بوت, أتمتة واتساب, واتساب Cloud API, شات بوت, أتمتة ماسنجر, أتمتة إنستغرام, أتمتة تليغرام, متجر واتساب, الدفع عند الاستلام, السلة المهجورة, منشئ التدفقات, وكيل ذكاء اصطناعي, حملات تسويق واتساب',
    imgAlt: 'أتمتة المحادثات عبر واتساب وماسنجر وإنستغرام تتحوّل إلى مبيعات',
    org: 'سبايدرز بوت',
    orgDesc: 'منصة واحدة لأتمتة التواصل والتسويق والبيع عبر واتساب وماسنجر وإنستغرام وتليغرام.',
    appDesc: 'منصة أتمتة محادثات ومتجر داخل الشات وحملات تسويقية عبر واتساب وماسنجر وإنستغرام وتليغرام، مع منشئ تدفّقات بلا كود ووكلاء ذكاء اصطناعي.'
  },
  en: {
    dir: 'ltr', other: '/', assets: '../assets', canonical: 'https://spidersbot.com/en/',
    locale: 'en_US', siteName: 'Spiders Bot',
    title: 'Spiders Bot | WhatsApp & Messenger Automation, In-Chat Store, and Sales',
    desc: 'No-code automation for WhatsApp, Messenger, and Instagram conversations, an in-chat store with cash on delivery, and smart marketing campaigns. Try Spiders Bot free for 7 days, no card required.',
    ogDesc: 'One platform to run your messaging, sales, and marketing: no-code automation, an in-chat store with cash on delivery, and smart campaigns. Start free for 7 days.',
    keywords: 'Spiders Bot, WhatsApp automation, WhatsApp Cloud API, chatbot, Messenger automation, Instagram automation, Telegram automation, WhatsApp store, cash on delivery, abandoned cart, flow builder, AI agent, WhatsApp marketing campaigns',
    imgAlt: 'Conversation automation across WhatsApp, Messenger, and Instagram turning into sales',
    org: 'Spiders Bot',
    orgDesc: 'One platform to automate messaging, marketing, and selling across WhatsApp, Messenger, Instagram, and Telegram.',
    appDesc: 'A platform for conversation automation, an in-chat store, and marketing campaigns across WhatsApp, Messenger, Instagram, and Telegram, with a no-code flow builder and AI agents.'
  }
};

function page(lang) {
  const M = META[lang];
  const v = valsFor(lang, 'monthly', 0);
  const scope = { ...v, t: v.t };

  let body = render(markup, scope);
  body = body.split('__OTHERLANG__').join(M.other);
  if (/\{\{|sc-for|sc-if|style-hover|onClick=|hint-placeholder/.test(body)) {
    throw new Error('template leftovers in ' + lang + ': ' + (body.match(/\{\{[^}]*\}\}|<sc-\w+|style-hover|onClick=|hint-placeholder/g) || []).slice(0, 5));
  }
  // the root div carried the language as fixed attributes in the canvas
  body = body.replace('<div id="dc-root" data-ref="root" dir="rtl" lang="ar"',
    `<div id="dc-root" data-ref="root" dir="${M.dir}" lang="${lang}"`);
  body = body.replace("font-family:'Readex Pro','Sora',sans-serif",
    lang === 'ar' ? "font-family:'Readex Pro','Sora',sans-serif" : "font-family:'Sora','Readex Pro',sans-serif");

  const bill = {};
  for (const b of ['monthly', 'yearly']) {
    const vb = valsFor(lang, b, 0);
    bill[b] = { prices: vb.plans.map(p => p.price), note: vb.plans[0].note };
  }

  const ld = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: M.org, alternateName: 'Spiders Bot', url: 'https://spidersbot.com/', logo: 'https://spidersbot.com/assets/spidersbot-logo.png', description: M.orgDesc, sameAs: [] },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: M.org, url: M.canonical, inLanguage: lang },
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: M.org,
      applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: M.canonical,
      description: M.appDesc, inLanguage: lang,
      offers: v.t.plans.map((p, i) => ({ '@type': 'Offer', name: p.name, price: PRICE_USD[i], priceCurrency: 'USD', description: p.desc, url: M.canonical + '#pricing' }))
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: v.t.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    }
  ].map(o => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`).join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${M.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(M.title)}</title>
<meta name="description" content="${esc(M.desc)}">
<meta name="keywords" content="${esc(M.keywords)}">
<meta name="author" content="${esc(M.org)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#060E26">
<link rel="alternate" hreflang="ar" href="https://spidersbot.com/">
<link rel="alternate" hreflang="en" href="https://spidersbot.com/en/">
<link rel="alternate" hreflang="x-default" href="https://spidersbot.com/">
<link rel="canonical" href="${M.canonical}">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(M.title)}">
<meta property="og:description" content="${esc(M.ogDesc)}">
<meta property="og:url" content="${M.canonical}">
<meta property="og:image" content="https://spidersbot.com/assets/hero.jpg">
<meta property="og:image:alt" content="${esc(M.imgAlt)}">
<meta property="og:locale" content="${M.locale}">
<meta property="og:site_name" content="${esc(M.siteName)}">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(M.title)}">
<meta name="twitter:description" content="${esc(M.desc)}">
<meta name="twitter:image" content="https://spidersbot.com/assets/hero.jpg">
<meta name="twitter:image:alt" content="${esc(M.imgAlt)}">
<link rel="icon" type="image/png" href="${M.assets}/favicon.png">
<link rel="apple-touch-icon" href="${M.assets}/spidersbot-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Readex+Pro:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
${helmetStyle.trim()}
${extraCss.trim()}
</style>
${ld}
</head>
<body>
${body}
<script>
${runtime(lang).replace('__BILL__', JSON.stringify(bill))}
</script>
</body>
</html>
`;
}

const PRICE_USD = ['19.00', '49.00', '99.00'];

const arHtml = page('ar');
const enHtml = page('en');
fs.writeFileSync(path.join(OUT, 'index.html'), arHtml, 'utf8');
fs.writeFileSync(path.join(OUT, 'en', 'index.html'), enHtml, 'utf8');
console.log('ar index.html', arHtml.length, 'chars');
console.log('en index.html', enHtml.length, 'chars');
