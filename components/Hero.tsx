'use client';

import React, { useEffect, useState } from 'react';
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

  // Carousel slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        marginTop: `${NAVBAR_HEIGHT}px`,
      }}
    >
      {/* === Carousel Background === */}
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
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
              />
              {/* === Caption Overlay === */}
              <div className="absolute bottom-6 right-6 bg-black/50 text-white text-sm md:text-base px-3 py-2 rounded-lg backdrop-blur-sm">
                {images[i % images.length].caption}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Fade effect on left edge of photo area */}
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* === Subtle gradient overlay for text readability === */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

      {/* === Text Content === */}
      <div
        className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-32"
        style={{ maxWidth: '40vw' }} 
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Hi, I'm {' '}
          <span className="text-indigo-400 font-extrabold">
            Leah
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-200 flex flex-wrap items-center space-x-2">
          <span>your next</span>
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
    </section>
  );
}
