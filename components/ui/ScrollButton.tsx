'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
}

export default function ScrollButton({
  targetId,
  children,
}: ScrollButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button className="rounded-full px-6" onClick={handleClick}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
