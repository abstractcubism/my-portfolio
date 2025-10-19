'use client';

import React, { useEffect, useState } from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

type Post = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: 'Built my Next.js Portfolio 🚀',
    description: 'Thoughts on building with Next.js and Tailwind.',
    image: '/images/post1.jpg',
    url: 'https://linkedin.com/posts/your-post-id',
  },
  {
    id: 2,
    title: 'React Tips ⚡',
    description: 'Quick React tips that boosted my workflow.',
    image: '/images/post2.jpg',
    url: 'https://linkedin.com/posts/your-post-id',
  },
  {
    id: 3,
    title: 'Career Growth 🌱',
    description: 'Networking and growth reflections.',
    image: '/images/post3.jpg',
    url: 'https://linkedin.com/posts/your-post-id',
  },
];

export default function LinkedInCarousel() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        rotateY: 360,
        transition: { repeat: Infinity, duration: 30, ease: 'linear' },
      });
    }
  }, [inView, controls]);

  const handleMouseEnter = () => {
    setHovered(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    controls.start({
      rotateY: 360,
      transition: { repeat: Infinity, duration: 30, ease: 'linear' },
    });
  };

  return (
    <section
      ref={ref}
      className="py-16 bg-gray-50 dark:bg-black flex flex-col items-center justify-center"
    >
      <motion.div
        className="flex space-x-8 perspective-1000"
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardContainer>
              <CardBody className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/20 rounded-xl p-6 w-64 cursor-pointer">
                <CardItem translateZ="50" className="text-xl font-bold text-neutral-800 dark:text-white">
                  {post.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                >
                  {post.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover rounded-xl"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
