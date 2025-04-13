import React, { forwardRef } from 'react';
import FadeInSection from '../ui/FadeInSection';
import { motion } from 'framer-motion';

const TeamSection = forwardRef(({ teamMembers }, ref) => {
  return (
    <section 
      ref={ref} 
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Наша команда</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Каждый участник команды отвечает за отдельный этап проекта
            </p>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <FadeInSection key={member.id} delay={0.2 * index}>
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-blue-100 to-indigo-50 p-6"
                  whileHover={{ 
                    background: "linear-gradient(to right, rgb(224, 242, 254), rgb(224, 231, 255))" 
                  }}
                >
                  <motion.div 
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                      {member.stage}
                    </div>
                  </motion.div>
                  <h3 className="font-bold text-xl text-center text-gray-800 mt-4">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-center mb-2">{member.role}</p>
                </motion.div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
});

TeamSection.displayName = 'TeamSection';

export default TeamSection;
