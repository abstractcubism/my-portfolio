'use client';

import { useState, useEffect } from 'react';
import LoadAnimation from './LoadAnimation';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showLoad, setShowLoad] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('portfolio-loaded')) {
      setShowLoad(true);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('portfolio-loaded', '1');
    setShowLoad(false);
  };

  return (
    <>
      {showLoad && <LoadAnimation onComplete={handleComplete} />}
      {children}
    </>
  );
}
