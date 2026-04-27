'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  SiPython, SiTypescript, SiJavascript, SiCplusplus, SiPostgresql, SiR,
  SiPytorch, SiScikitlearn, SiLangchain,
  SiReact, SiNextdotjs, SiTailwindcss, SiGreensock, SiFramer, SiSupabase,
  SiGit, SiDocker, SiStripe, SiClerk,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';

type Item = { name: string; Icon?: IconType };

const ROW1: Item[] = [
  { name: 'Python',     Icon: SiPython     },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Java',       Icon: FaJava       },
  { name: 'C++',        Icon: SiCplusplus  },
  { name: 'SQL',        Icon: SiPostgresql },
  { name: 'R',          Icon: SiR          },
  { name: 'Git',        Icon: SiGit        },
  { name: 'Docker',     Icon: SiDocker     },
];

const ROW2: Item[] = [
  { name: 'PyTorch',          Icon: SiPytorch     },
  { name: 'scikit-learn',     Icon: SiScikitlearn },
  { name: 'LangChain',        Icon: SiLangchain   },
  { name: 'Azure AI Foundry'                      },
  { name: 'LLMs'                                  },
  { name: 'MCP'                                   },
  { name: 'React',            Icon: SiReact       },
  { name: 'Next.js',          Icon: SiNextdotjs   },
  { name: 'Tailwind CSS',     Icon: SiTailwindcss },
  { name: 'GSAP',             Icon: SiGreensock   },
  { name: 'Framer Motion',    Icon: SiFramer      },
  { name: 'Supabase',         Icon: SiSupabase    },
  { name: 'Stripe',           Icon: SiStripe      },
  { name: 'Clerk',            Icon: SiClerk       },
  { name: 'Microsoft Fabric'                      },
  { name: 'ServiceNow'                            },
];

function Pill({ name, Icon, lit }: Item & { lit: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = lit || hovered;

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-full border shrink-0 select-none cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'border-color 0.35s ease, background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease',
        borderColor: active ? 'var(--color-accent)' : 'var(--border)',
        background:  active ? 'var(--color-accent-subtle)' : 'transparent',
        color:       active ? 'var(--color-accent)' : 'var(--muted-foreground)',
        boxShadow:   active ? '0 0 18px var(--color-accent-muted)' : 'none',
      }}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {name}
    </span>
  );
}

function pickRandom(max: number, count: number): Set<number> {
  const s = new Set<number>();
  while (s.size < count) s.add(Math.floor(Math.random() * max));
  return s;
}

export default function HeroTechStack() {
  const row1Ref   = useRef<HTMLDivElement>(null);
  const row2Ref   = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const [lit1, setLit1] = useState<Set<number>>(new Set());
  const [lit2, setLit2] = useState<Set<number>>(new Set());

  // Cycle highlights independently on each row
  useEffect(() => {
    setLit1(pickRandom(ROW1.length, 2));
    const t2 = setTimeout(() => setLit2(pickRandom(ROW2.length, 3)), 900);
    const id1 = setInterval(() => setLit1(pickRandom(ROW1.length, 2)), 2400);
    const id2 = setInterval(() => setLit2(pickRandom(ROW2.length, 3)), 1900);
    return () => { clearTimeout(t2); clearInterval(id1); clearInterval(id2); };
  }, []);

  // 4 copies → animate ±25% (= one copy) for a seamless loop
  useEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.fromTo(row1Ref.current, { xPercent: 0   }, { xPercent: -25, duration: 42, ease: 'none', repeat: -1 });
      const t2 = gsap.fromTo(row2Ref.current, { xPercent: -25 }, { xPercent: 0,   duration: 36, ease: 'none', repeat: -1 });
      tweensRef.current = [t1, t2];
    });
    return () => ctx.revert();
  }, []);

  const pause  = () => tweensRef.current.forEach(t => t.pause());
  const resume = () => tweensRef.current.forEach(t => t.resume());

  return (
    <section
      className="relative z-[5] border-t border-[var(--border)] py-7 bg-[var(--background)] overflow-hidden transition-colors duration-500 cursor-default"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — scrolls left */}
        <div className="flex gap-2" style={{ willChange: 'transform' }}>
          <div ref={row1Ref} className="flex gap-2 w-max">
            {[...ROW1, ...ROW1, ...ROW1, ...ROW1].map((item, i) => (
              <Pill key={i} {...item} lit={lit1.has(i % ROW1.length)} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex gap-2" style={{ willChange: 'transform' }}>
          <div ref={row2Ref} className="flex gap-2 w-max">
            {[...ROW2, ...ROW2, ...ROW2, ...ROW2].map((item, i) => (
              <Pill key={i} {...item} lit={lit2.has(i % ROW2.length)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
