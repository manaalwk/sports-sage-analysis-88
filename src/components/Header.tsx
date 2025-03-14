
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BarChartHorizontal, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn('w-full py-4 px-6', className)}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <BarChartHorizontal className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Vizion</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </a>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Blog
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" size="sm" className="justify-center">
                  Sign In
                </Button>
                <Button size="sm" className="justify-center">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
