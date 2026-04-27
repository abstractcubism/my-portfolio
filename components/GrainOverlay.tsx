'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const SIZE = 400;

export default function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const hiddenRoutes = new Set(['/about', '/resume']);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = SIZE;
    canvas.height = SIZE;

    const buf = new Uint8ClampedArray(SIZE * SIZE * 4);
    let raf: number;
    let last = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 66) return; // ~15 fps
      last = now;

      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 256) | 0;
        buf[i] = buf[i + 1] = buf[i + 2] = v;
        buf[i + 3] = 55;
      }
      ctx.putImageData(new ImageData(buf, SIZE, SIZE), 0, 0);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 6,
        opacity: 0.45,
        mixBlendMode: 'overlay',
        display: hiddenRoutes.has(pathname) ? 'none' : 'block',
      }}
    />
  );
}
