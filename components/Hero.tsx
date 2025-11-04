'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

const images = [
  { src: '/hero1.jpg', caption: '' },
  { src: '/hero2.jpg', caption: 'Startup Grind 2025' },
  { src: '/hero3.jpg', caption: 'Bloomberg Women in Data 2025' },
  { src: '/hero4.jpg', caption: 'Bloomberg Women in Data 2025' },
  { src: '/hero5.jpg', caption: 'Startup Grind 2025' },
  { src: '/hero6.jpg', caption: 'Microsoft 2024' },
];

export default function Hero() {
  const NAVBAR_HEIGHT = 80;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero"
      className="relative w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        marginTop: `${NAVBAR_HEIGHT}px`,
      }}
    >

      {/* Carousel */}

      <div className="absolute right-0 top-0 h-full w-[70%] overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${(index % images.length) * 100}%` }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          {[...images, ...images].map((img, i) => (
            <div key={i} className="relative w-full h-full flex-shrink-0">
              <Image
                src={img.src}
                alt={img.caption}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 100vw, 70vw"
                className="object-cover"
              />

              {/* Left Background Column */}

              <div
                className="absolute bottom-6 right-6 text-[var(--foreground)] text-sm md:text-base px-3 py-2 rounded-lg backdrop-blur-sm transition-colors duration-300"
                style={{ backgroundColor: 'color-mix(in oklch, var(--background) 60%, transparent)' }}
              >
                {images[i % images.length].caption}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute left-0 top-0 w-1/3 h-full theme-fade-right pointer-events-none transition-all duration-300" />
      </div>

      <div className="absolute inset-0 theme-fade-right transition-all duration-300" />

      {/* Text Content */}

      <div className="max-w-6xl mx-auto h-full px-6">
        <div
          className="relative z-10 flex flex-col justify-center h-full pl-0 pr-8 md:pl-2 md:pr-16 lg:pl-8 lg:pr-32 transition-colors duration-300"
          style={{ maxWidth: '38vw' }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight drop-shadow-lg">
            Hi, I'm{' '}
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
              Leah
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-[var(--muted-foreground)] flex flex-wrap items-center space-x-2">
            <span>your next</span>

            {/* Typing Effect */}

            <Typewriter
              options={{
                strings: [
                  'software engineer.',
                  'data scientist.',
                  'AI engineer.',
                  'intern.',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                wrapperClassName: 'inline-block',
                cursorClassName: 'inline-block',
              }}
            />
          </h2>
        </div>
      </div>
    </section>
  );
}
