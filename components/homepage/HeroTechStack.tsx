'use client';

import { useEffect, useRef } from 'react';
import {
  SiPython, SiTypescript, SiJavascript, SiC, SiPostgresql, SiR,
  SiPytorch, SiScikitlearn, SiLangchain,
  SiReact, SiNextdotjs, SiTailwindcss, SiGreensock, SiFramer, SiSupabase,
  SiGit, SiDocker, SiStripe, SiClerk,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Gravity, GravityRef, MatterBody } from './Gravity';

type Pill = {
  name: string;
  Icon?: IconType;
  x: string;
  y: string;
  angle: number;
};

const PILLS: Pill[] = [
  { name: 'Python',           Icon: SiPython,      x: '5%',  y: '2%',  angle: -4  },
  { name: 'Pandas',                                x: '10%', y: '4%',  angle: 7   },
  { name: 'TypeScript',       Icon: SiTypescript,  x: '16%', y: '1%',  angle: 3   },
  { name: 'MatPlotLib',                            x: '23%', y: '2%',  angle: -3  },
  { name: 'JavaScript',       Icon: SiJavascript,  x: '30%', y: '3%',  angle: -6  },
  { name: 'Java',             Icon: FaJava,        x: '43%', y: '2%',  angle: 5   },
  { name: 'C',                Icon: SiC,           x: '55%', y: '1%',  angle: -3  },
  { name: 'SQL',              Icon: SiPostgresql,  x: '65%', y: '3%',  angle: 7   },
  { name: 'R',                Icon: SiR,           x: '76%', y: '2%',  angle: -5  },
  { name: 'Git',              Icon: SiGit,         x: '85%', y: '1%',  angle: 4   },
  { name: 'scikit-learn',     Icon: SiScikitlearn, x: '24%', y: '4%',  angle: -4  },
  { name: 'Azure AI Foundry',                      x: '52%', y: '5%',  angle: -6  },
  { name: 'LLMs',                                  x: '64%', y: '4%',  angle: 5   },
  { name: 'MCP',                                   x: '73%', y: '6%',  angle: -3  },
  { name: 'React',            Icon: SiReact,       x: '82%', y: '5%',  angle: 7   },
  { name: 'Next.js',          Icon: SiNextdotjs,   x: '91%', y: '4%',  angle: -5  },
  { name: 'Tailwind CSS',     Icon: SiTailwindcss, x: '8%',  y: '9%',  angle: 4   },
  { name: 'GSAP',             Icon: SiGreensock,   x: '20%', y: '8%',  angle: -7  },
  { name: 'Supabase',         Icon: SiSupabase,    x: '48%', y: '9%',  angle: -4  },
  { name: 'Stripe',           Icon: SiStripe,      x: '60%', y: '8%',  angle: 3   },
  { name: 'Clerk',            Icon: SiClerk,       x: '71%', y: '10%', angle: -6  },
  { name: 'Microsoft Fabric',                      x: '83%', y: '9%',  angle: 5   },
  { name: 'ServiceNow',                            x: '95%', y: '8%',  angle: -3  },
];

export default function HeroTechStack({ children }: { children?: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gravityRef = useRef<GravityRef>(null);
  const started = useRef(false);

  // Start physics only when the user scrolls the section into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          gravityRef.current?.start();
        }
      },
      { threshold: 0.1 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-[var(--border)] bg-[var(--background)] transition-colors duration-500 overflow-hidden"
    >
      {/* Gravity canvas — spans the full height of this wrapper absolutely */}
      <Gravity
        ref={gravityRef}
        gravity={{ x: 0, y: 1.4 }}
        grabCursor
        autoStart={false}
        floorOffset={0}
        hitAreaOverflowBottom={80}
        style={{ zIndex: 20, pointerEvents: 'none' }}
      >
        {PILLS.map((pill) => (
          <MatterBody
            key={pill.name}
            x={pill.x}
            y={pill.y}
            angle={pill.angle}
            matterBodyOptions={{ friction: 0.3, restitution: 0.25, density: 0.002 }}
          >
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-full border shrink-0 select-none whitespace-nowrap"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--background)',
                color: 'var(--muted-foreground)',
              }}
            >
              {pill.Icon && <pill.Icon className="w-3 h-3 shrink-0" />}
              {pill.name}
            </span>
          </MatterBody>
        ))}
      </Gravity>

      {/* Top spacer — pills start falling through here */}
      <div style={{ height: 100 }} aria-hidden="true" />

      {/* Timeline content — rendered above the physics layer */}
      {children && (
        <div className="relative" style={{ zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            {children}
          </div>
        </div>
      )}

      {/* Bottom spacer — pills pile up here; pointer-events none so pills stay grabbable */}
      <div style={{ height: 280, pointerEvents: 'none', position: 'relative', zIndex: 10 }}>
        <p
          className="absolute top-6 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] leading-relaxed pointer-events-none select-none"
          style={{ color: 'var(--color-accent)', opacity: 0.6, whiteSpace: 'nowrap' }}
        >
          oops... my skills got away from me.<br />
          drag them back?
        </p>
      </div>
    </div>
  );
}
