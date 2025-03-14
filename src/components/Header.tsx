
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, BarChartHorizontal } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-4 px-6 flex items-center justify-between', className)}>
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <BarChartHorizontal className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Vizion</h1>
        </div>
        <div className="hidden md:flex items-center ml-10 space-x-6">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Analysis
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Library
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Documentation
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="glass-button px-4 py-2 text-sm">
          <span>Get Started</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
