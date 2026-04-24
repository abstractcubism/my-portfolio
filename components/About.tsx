'use client';

// Icons from react-icons.github.io/react-icons/

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
} from 'react-icons/si';
import { FaJava, FaRProject, FaDatabase } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';

// Constructing Tech Stack information for Right Column

const techStack = [
  {
    role: 'Software Engineering',
    skills: [
      { name: 'Python', icon: <SiPython className="text-blue-500 w-6 h-6" />, colSpan: 1 },
      { name: 'Java', icon: <FaJava className="text-red-500 w-6 h-6" />, colSpan: 1 },
      { name: 'C++', icon: <SiCplusplus className="text-blue-700 w-6 h-6" />, colSpan: 2 },
    ],
  },
  {
    role: 'AI Solutions',
    skills: [
      { name: 'Python (scikit-learn, PyTorch)', icon: <SiPython className="text-blue-500 w-6 h-6" />, colSpan: 2 },
      { name: 'Azure AI Foundry', icon: <VscAzure className="text-blue-700 w-6 h-6" />, colSpan: 2 },
    ],
  },
  {
    role: 'Data Science',
    skills: [
      { name: 'Python (pandas, numpy, matplotlib, seaborn)', icon: <SiPython className="text-blue-500 w-6 h-6" />, colSpan: 2 },
      { name: 'SQL', icon: <FaDatabase className="text-orange-500 w-6 h-6" />, colSpan: 1 },
      { name: 'R', icon: <FaRProject className="text-blue-700 w-6 h-6" />, colSpan: 1 },
    ],
  },
  {
    role: 'Web Development',
    skills: [
      { name: 'React', icon: <SiReact className="text-cyan-500 w-6 h-6" />, colSpan: 1 },
      { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6" />, colSpan: 1 },
      { name: 'TailwindCSS', icon: <SiTailwindcss className="text-teal-400 w-6 h-6" />, colSpan: 1 },
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400 w-6 h-6" />, colSpan: 1 },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-600 w-6 h-6" />, colSpan: 2 },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

//Confetti animation on image click, written by ChatGPT

export default function About() {
  const [imageClicked, setImageClicked] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number; color: string; size: number; duration: number; rotate: number }>>([]);

  const handleImageClick = () => {
    setImageClicked(!imageClicked);
    const newParticles = Array.from({ length: 18 }, (_, i) => {
      const angle = Math.random() * 360; 
      const distance = 110 + Math.random() * 80; 
      const hue = Math.floor(Math.random() * 360);
      const color = `hsl(${hue}, 80%, 60%)`;
      const size = 3 + Math.floor(Math.random() * 4);
      const duration = 0.8 + Math.random() * 0.5; 
      const rotate = Math.random() * 180 - 90;
      return { id: i, angle, distance, color, size, duration, rotate };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 900);
  };

  return (
    <section
      id="about"
      className="py-24 px-6 scroll-mt-24 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">

        {/* Left Column */}

        <motion.div
          className="space-y-3 flex flex-col items-center flex-1 h-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 text-center"
            variants={itemVariants}
          >
            About Me
          </motion.h2>

          <motion.div
            className="mt-2 md:mt-4 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            animate={imageClicked ? { rotate: [0, 15, -15, 0] } : {}}
            transition={{ duration: 0.8 }}
            onClick={handleImageClick}
            variants={itemVariants}
          >
            <Image
              src="/me.jpg"
              alt="Leah"
              width={256}
              height={256}
              className="object-cover w-full h-full"
            />

            {/* Confetti Animation on image click written by ChatGPT */}

            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: p.size,
                    height: p.size,
                    marginLeft: -(p.size / 2),
                    marginTop: -(p.size / 2),
                    backgroundColor: p.color,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                  animate={{
                    x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                    y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                    opacity: 0,
                    scale: 0.6,
                    rotate: p.rotate,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: p.duration, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl leading-normal text-center max-w-md text-[var(--muted-foreground)] transition-colors duration-300"
            variants={itemVariants}
          >
            I'm a junior at Rutgers University with a passion for learning and
            solving complex problems. I enjoy working across multiple domains
            including AI, data analytics, and software engineering.
          </motion.p>

          <div className="hidden md:block md:flex-1" />

          <motion.div
            className="mt-3 p-4 max-w-md text-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-[color-mix(in_oklch,var(--background)_96%,transparent)] text-[var(--foreground)]"
            variants={itemVariants}
          >
            <p className="text-sm md:text-base leading-relaxed">
              I enjoy playing video games, trying new restaurants, casual photography, and building
              projects in my free time.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column */}

        <motion.div
          className="space-y-8 flex-1 flex flex-col justify-between pr-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <h3 className="text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400 text-center">
            Tech Stack
          </h3>

          {techStack.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants} className="mb-6">
              <h4 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{section.role}</h4>
              <div className="grid grid-cols-2 gap-3 auto-rows-min">
                {section.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 border border-gray-200 dark:border-gray-800 bg-[color-mix(in_oklch,var(--background)_96%,transparent)] hover:bg-[color-mix(in_oklch,var(--background)_92%,transparent)] transition-colors duration-200 ${
                      skill.colSpan === 2 ? 'col-span-2' : 'col-span-1'
                    }`}
                    variants={itemVariants}
                  >
                    {skill.icon}
                    <span className="text-sm md:text-base text-[var(--foreground)] drop-shadow-sm">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
