import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 py-10 relative overflow-hidden">
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-100 rounded-full opacity-30 blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="w-37 h-11 overflow-hidden mb-4 relative"
            whileHover={{ scale: 1.2 }}
            animate={{ 
              y: [0, -5, 0]
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          >
            <img src="images/footer.png" alt="РУДН" className="h-full w-full object-contain" />
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Исследование плавления малых кластеров
          </motion.h2>
          
          <motion.div 
            className="text-gray-600 mb-4"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p>Российский университет дружбы народов</p>
            <p className="text-sm">Математическое моделирование (02.03.02)</p>
          </motion.div>
          
          <motion.div 
            className="w-full max-w-lg pt-2 border-t border-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-500 text-sm mt-2">© 2025 Все права защищены.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
