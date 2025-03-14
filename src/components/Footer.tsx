
import React from 'react';
import { BarChartHorizontal, Mail, MessageSquare, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <BarChartHorizontal className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Vizion</h2>
            </div>
            <p className="text-sm">
              Advanced sports video analysis powered by AI and computer vision technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2023 Vizion Sports Analysis. All rights reserved.</p>
          <p className="text-sm mt-4 md:mt-0">Powered by YOLOv8 and advanced AI technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
