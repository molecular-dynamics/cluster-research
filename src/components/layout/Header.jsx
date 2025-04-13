import React from 'react';
import Navigation from './Navigation';
import { motion } from 'framer-motion';

const Header = ({ 
  activeSection, 
  scrollToSection, 
  homeRef, 
  teamRef, 
  stagesRef, 
  resourcesRef, 
  scrollProgress 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300" 
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: scrollProgress.get() > 0.05 ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none"
      }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 overflow-hidden">
              <img src="images/logo.png" alt="РУДН" className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Исследование плавления малых кластеров</h1>
              <p className="text-xs text-gray-500">РУДН &bull; Математическое моделирование (02.03.02)</p>
            </div>
          </motion.div>
          
          <Navigation 
            activeSection={activeSection} 
            scrollToSection={scrollToSection}
            homeRef={homeRef}
            teamRef={teamRef}
            stagesRef={stagesRef}
            resourcesRef={resourcesRef}
          />
          
          <motion.div 
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
