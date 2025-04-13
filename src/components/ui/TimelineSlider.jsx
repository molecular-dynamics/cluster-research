import React from 'react';
import { motion } from 'framer-motion';

const TimelineSlider = ({ stages, activeStage, onChange }) => {
  return (
    <div className="mb-12 relative max-w-2xl mx-auto">
      <div className="relative py-4">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2"></div>
        
        <motion.div 
          className="absolute left-0 top-1/2 h-1 bg-blue-500 -translate-y-1/2"
          style={{ width: `${((activeStage - 1) / (stages.length - 1)) * 100}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${((activeStage - 1) / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        ></motion.div>
        
        <div className="flex justify-between">
          {stages.map((stage) => (
            <div key={stage.id} className="relative">
              <motion.button
                onClick={() => onChange(stage.id)}
                className={`relative z-10`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: [1, stage.id === activeStage ? 1.05 : 1, 1],
                  rotate: [0, stage.id === activeStage ? 5 : 0, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  repeatType: "mirror"
                }}
              >
                {/* Пульсирующий эффект для неактивных этапов */}
                {stage.id !== activeStage && (
                  <motion.div
                    className="absolute inset-0 bg-blue-200 rounded-full opacity-50"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      repeatType: "mirror"
                    }}
                  />
                )}
                
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${stage.id === activeStage 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-200 glow-effect' 
                      : stage.id < activeStage 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border border-gray-300 text-gray-600'
                    }`}
                >
                  {stage.id}
                </motion.div>
              </motion.button>
              
              <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className={`text-sm font-medium ${
                  stage.id === activeStage ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stage.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-16">
        <motion.h3 
          className="text-2xl font-bold text-gray-800"
          animate={{ 
            scale: [1, 1.03, 1],
            color: [
              'rgb(31, 41, 55)', 
              'rgb(37, 99, 235)', 
              'rgb(31, 41, 55)'
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            repeatType: "mirror"
          }}
        >
          {stages[activeStage-1].title}
        </motion.h3>
        <p className="text-sm text-blue-600 mt-1">{stages[activeStage-1].presenter}</p>
      </div>
    </div>
  );
};

export default TimelineSlider;
