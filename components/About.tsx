'use client';

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
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
} from 'react-icons/si';
import { FaJava, FaRProject } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';

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
      { name: 'SQL', icon: <FaRProject className="text-orange-500 w-6 h-6" />, colSpan: 1 },
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

export default function About() {
  const [imageClicked, setImageClicked] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; angle: number }>>([]);

  const handleImageClick = () => {
    setImageClicked(!imageClicked);
    setParticles(Array.from({ length: 20 }, (_, i) => ({ id: i, angle: Math.random() * 120 - 60 })));
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <section id="about" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">

        {/* Left Column */}
        <motion.div
          className="space-y-6 flex flex-col items-center justify-between flex-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-5xl font-bold text-indigo-400 text-center"
            variants={itemVariants}
          >
            About Me
          </motion.h2>

          <motion.div
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl cursor-pointer relative"
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
            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute w-2 h-2 rounded-full top-1/2 left-1/2"
                  style={{ backgroundColor: `hsl(${Math.random() * 360}, 80%, 70%)` }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((p.angle * Math.PI) / 180) * 150,
                    y: Math.sin((p.angle * Math.PI) / 180) * 150,
                    opacity: 0,
                    scale: 0.5,
                  }}
                  transition={{ duration: 1 }}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl leading-relaxed text-center md:text-center max-w-md"
            variants={itemVariants}
          >
            I'm a junior at Rutgers University with a passion for learning and
            solving complex problems. I enjoy working across multiple domains
            including AI, data analytics, and software engineering.
          </motion.p>

          <motion.div
            className="mt-4 p-4 bg-gray-900 rounded-xl shadow-md text-center text-gray-300 max-w-xs hover:scale-105 hover:shadow-indigo-500/50 transition-transform cursor-pointer"
            variants={itemVariants}
          >
            <p>
              I enjoy playing video games, trying new restaurants, casual photography, and developing
              projects in my free time!
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
          <h3 className="text-5xl font-bold mb-4 text-indigo-400 text-center">
            Tech Stack
          </h3>

          {techStack.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants} className="mb-6">
              <h4 className="text-xl font-semibold mb-2 text-white">{section.role}</h4>
              <div className="grid grid-cols-2 gap-4 auto-rows-min">
                {section.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-3 bg-gray-900 p-3 rounded-xl shadow-md hover:scale-105 hover:shadow-indigo-500/50 transition-transform cursor-pointer ${
                      skill.colSpan === 2 ? 'col-span-2' : 'col-span-1'
                    }`}
                    variants={itemVariants}
                  >
                    {skill.icon}
                    <span className="text-sm md:text-base">{skill.name}</span>
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
