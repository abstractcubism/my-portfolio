'use client';

import { useEffect, useState } from 'react';

export default function ResumePreview({ src }: { src: string }) {
  const [showFrame, setShowFrame] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShowFrame(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!showFrame) {
    return (
      <div className="flex h-[calc(100dvh-7.75rem)] min-h-[720px] w-full items-center justify-center bg-white">
        <div className="h-12 w-48 animate-pulse rounded-full bg-[var(--border)]" />
      </div>
    );
  }

  return (
    <iframe
      title="Resume PDF preview"
      src={src}
      className="h-[calc(100dvh-7.75rem)] min-h-[720px] w-full bg-white"
    />
  );
}
