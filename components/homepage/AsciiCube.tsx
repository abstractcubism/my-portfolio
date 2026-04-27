'use client';

import { useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';

const COLS = 62;
const ROWS = 27;
const K1 = 50;
const K2 = 4.0;
const SIZE = 1.0;
const STEP = 0.035;
const CHARS = '.,-~:;=!*#$@';

type Vec3 = [number, number, number];

const LIGHT: Vec3 = [0.577, 0.577, -0.577];

const FACES: Array<{ n: Vec3; pos: (u: number, v: number) => Vec3 }> = [
  { n: [0, 0, 1]  as Vec3, pos: (u, v) => [u, v,     SIZE] },
  { n: [0, 0, -1] as Vec3, pos: (u, v) => [u, v,    -SIZE] },
  { n: [1, 0, 0]  as Vec3, pos: (u, v) => [SIZE,  v,    u] },
  { n: [-1, 0, 0] as Vec3, pos: (u, v) => [-SIZE, v,    u] },
  { n: [0, 1, 0]  as Vec3, pos: (u, v) => [u,  SIZE,   v] },
  { n: [0, -1, 0] as Vec3, pos: (u, v) => [u, -SIZE,   v] },
];

function rotateXY(x: number, y: number, z: number, ax: number, ay: number): Vec3 {
  const y1 = y * Math.cos(ax) - z * Math.sin(ax);
  const z1 = y * Math.sin(ax) + z * Math.cos(ax);
  const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
  const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
  return [x2, y1, z2];
}

export default function AsciiCube() {
  const preRef = useRef<HTMLPreElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    let ax = 0.5, ay = 0.3;
    let rafId: number;

    const frame = () => {
      const buf = new Array<string>(COLS * ROWS).fill(' ');
      const zbuf = new Float32Array(COLS * ROWS).fill(-Infinity);

      for (const face of FACES) {
        const [rnx, rny, rnz] = rotateXY(face.n[0], face.n[1], face.n[2], ax, ay);
        const lum = rnx * LIGHT[0] + rny * LIGHT[1] + rnz * LIGHT[2];
        const ci = Math.max(0, Math.min(CHARS.length - 1,
          Math.round((lum + 1) * 0.5 * (CHARS.length - 1))
        ));
        const ch = CHARS[ci];

        for (let u = -SIZE; u <= SIZE; u += STEP) {
          for (let v = -SIZE; v <= SIZE; v += STEP) {
            const [px, py, pz] = face.pos(u, v);
            const [rx, ry, rz] = rotateXY(px, py, pz, ax, ay);
            const z = rz + K2;
            if (z <= 0.01) continue;
            const ooz = 1 / z;
            const sx = Math.round(rx * K1 * ooz + COLS / 2);
            const sy = Math.round(ry * K1 * ooz * 0.5 + ROWS / 2);
            if (sx < 0 || sx >= COLS || sy < 0 || sy >= ROWS) continue;
            const idx = sy * COLS + sx;
            if (ooz > zbuf[idx]) {
              zbuf[idx] = ooz;
              buf[idx] = ch;
            }
          }
        }
      }

      let out = '';
      for (let r = 0; r < ROWS; r++) {
        out += buf.slice(r * COLS, (r + 1) * COLS).join('') + '\n';
      }
      if (preRef.current) preRef.current.textContent = out;

      const speed = isHovering.current ? 4.5 : 1;
      ax += 0.007 * speed;
      ay += 0.011 * speed;
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <a
      href="https://github.com/abstractcubism"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View GitHub profile"
      className="relative inline-block w-fit cursor-pointer"
      onMouseEnter={() => {
        isHovering.current = true;
        if (overlayRef.current) overlayRef.current.style.opacity = '1';
      }}
      onMouseLeave={() => {
        isHovering.current = false;
        if (overlayRef.current) overlayRef.current.style.opacity = '0';
      }}
    >
      <pre
        ref={preRef}
        className="block w-fit font-mono text-[var(--color-accent)] select-none leading-tight"
        style={{ fontSize: 'clamp(10px, 1.5vw, 16px)', lineHeight: 1.18 }}
        aria-hidden
      />

      {/* GitHub overlay — fades in on hover */}
      <div
        ref={overlayRef}
        data-no-glow="true"
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <FaGithub
          className="text-[var(--color-accent)]"
          style={{ width: '2.8rem', height: '2.8rem' }}
        />
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mt-2">
          github
        </span>
      </div>
    </a>
  );
}
