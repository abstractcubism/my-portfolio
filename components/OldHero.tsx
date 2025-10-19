'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';
import { Vortex } from './ui/vortex';

export default function Hero() {
  const NAVBAR_HEIGHT = 80;

  return (
    <section
      className="relative w-full bg-black"
      style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
    >
      <Vortex
        baseHue={220}
        backgroundColor="var(--background)"
        containerClassName="absolute inset-0 w-full h-full"
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
          Hi, my name is {' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Leah
          </span>
        </h1>

        {/* Inline "your next" + rotating roles */}
        <h2 className="text-lg md:text-2xl text-white text-center flex justify-center items-center space-x-2">
          <span>your next</span>
          <Typewriter
            options={{
              strings: ['software engineer', 'data scientist', 'AI engineer', 'intern'],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              wrapperClassName: 'inline-block',
              cursorClassName: 'inline-block',
            }}
          />
        </h2>
      </Vortex>
    </section>
  );
}
