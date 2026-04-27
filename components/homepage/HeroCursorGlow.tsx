'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const BLOB_RADIUS = 340;
const WHITE_RADIUS = BLOB_RADIUS * 0.65;

export default function HeroCursorGlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const cur = useRef({ x: -1000, y: -1000 });
  const opacityVal = useRef(0);
  const rafRef = useRef<number>(0);
  const textEls = useRef<Element[]>([]);
  const rectsCache = useRef(new Map<Element, DOMRect>());
  const frameCount = useRef(0);
  const modifiedParents = useRef<Set<Element>>(new Set());

  const pathname = usePathname();

  const refreshRects = useCallback(() => {
    for (const el of textEls.current) {
      rectsCache.current.set(el, el.getBoundingClientRect());
    }
  }, []);

  const wrapTextNodes = useCallback((el: Element): Element[] => {
    const wordSpans: Element[] = [];
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType !== Node.TEXT_NODE) continue;
      const text = child.textContent || '';
      if (!text.trim()) continue;

      const fragment = document.createDocumentFragment();
      for (const part of text.split(/(\s+)/)) {
        if (/\S/.test(part)) {
          const span = document.createElement('span');
          span.setAttribute('data-word-glow', '');
          span.textContent = part;
          fragment.appendChild(span);
          wordSpans.push(span);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      }
      el.replaceChild(fragment, child);
      modifiedParents.current.add(el);
    }
    return wordSpans;
  }, []);

  const collectTextEls = useCallback(() => {
    for (const parent of modifiedParents.current) {
      parent.querySelectorAll('[data-word-glow]').forEach(span => {
        span.replaceWith(document.createTextNode(span.textContent || ''));
      });
      parent.normalize();
    }
    modifiedParents.current.clear();
    textEls.current = [];
    rectsCache.current.clear();

    const WRAP_SELECTORS = 'h1, h2, h3, h4, p, a, li, label';
    const tracked: Element[] = [];

    for (const id of ['hero', 'contact']) {
      const section = document.getElementById(id);
      if (!section) continue;

      section.querySelectorAll(WRAP_SELECTORS).forEach(el => {
        if (el.closest('[data-no-glow]')) return;
        if (el.hasAttribute('data-word-glow')) return;
        tracked.push(...wrapTextNodes(el));
      });

      section.querySelectorAll('pre').forEach(el => {
        if (!el.closest('[data-no-glow]')) tracked.push(el);
      });

      section.querySelectorAll('span:not([data-word-glow])').forEach(el => {
        if (el.closest('[data-no-glow]')) return;
        if (el.children.length === 0 && (el.textContent || '').trim()) {
          tracked.push(el);
        }
      });
    }

    textEls.current = tracked;
    refreshRects();
  }, [wrapTextNodes, refreshRects]);

  // Three attempts: fast returns (400ms), slow dynamic imports (1500ms),
  // and first-visit load animations (3500ms).
  useEffect(() => {
    const t1 = setTimeout(collectTextEls, 400);
    const t2 = setTimeout(collectTextEls, 1500);
    const t3 = setTimeout(collectTextEls, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [pathname, collectTextEls]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', refreshRects);
    window.addEventListener('scroll', refreshRects, { passive: true });

    const tick = () => {
      cur.current.x += (mouse.current.x - cur.current.x) * 0.015;
      cur.current.y += (mouse.current.y - cur.current.y) * 0.015;

      let inSection = false;
      for (const id of ['hero', 'contact']) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (mouse.current.y >= r.top && mouse.current.y <= r.bottom) {
          inSection = true;
          break;
        }
      }

      opacityVal.current += ((inSection ? 1 : 0) - opacityVal.current) * 0.08;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(calc(${cur.current.x}px - 50%), calc(${cur.current.y}px - 50%))`;
        wrapperRef.current.style.opacity = String(opacityVal.current);
      }

      frameCount.current++;
      if (frameCount.current % 45 === 0) refreshRects();

      const bx = cur.current.x;
      const by = cur.current.y;
      const glowActive = opacityVal.current > 0.05;

      for (const el of textEls.current) {
        const rect = rectsCache.current.get(el);
        if (!rect) continue;
        let lit = false;
        if (glowActive) {
          const nx = Math.max(rect.left, Math.min(bx, rect.right));
          const ny = Math.max(rect.top, Math.min(by, rect.bottom));
          lit = (bx - nx) ** 2 + (by - ny) ** 2 <= WHITE_RADIUS ** 2;
        }
        (el as HTMLElement).style.color = lit ? 'white' : '';
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', refreshRects);
      window.removeEventListener('scroll', refreshRects);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      for (const parent of modifiedParents.current) {
        parent.querySelectorAll('[data-word-glow]').forEach(span => {
          span.replaceWith(document.createTextNode(span.textContent || ''));
        });
        parent.normalize();
      }
      modifiedParents.current.clear();
    };
  }, [refreshRects]);

  return (
    <>
      <svg aria-hidden="true" style={{ display: 'none' }}>
        <defs>
          <filter id="glow-noise" x="-32%" y="-32%" width="164%" height="164%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0085" numOctaves="5" seed="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="22" />
          </filter>
        </defs>
      </svg>

      <div
        ref={wrapperRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 680,
          height: 680,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 4,
          filter: 'url(#glow-noise)',
          background: `radial-gradient(
            circle at 50% 50%,
            oklch(0.36 0.26 142 / 0.53) 0%,
            oklch(0.35 0.23 142 / 0.34) 24%,
            oklch(0.34 0.20 142 / 0.12) 45%,
            oklch(0.32 0.15 142 / 0.03) 62%,
            transparent 74%
          )`,
        }}
      />
    </>
  );
}
