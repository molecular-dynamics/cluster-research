import React, { forwardRef } from 'react';
import FadeInSection from '../ui/FadeInSection';
import { motion } from 'framer-motion';

const ResourcesSection = forwardRef((props, ref) => {
  const sourceFiles = [
    { name: "cluster_generator.py", desc: "Генерация начальных конфигураций кластеров с 'магическими' числами частиц" },
    { name: "md_engine.py", desc: "Основной модуль молекулярной динамики с алгоритмом Верле" },
    { name: "thermodynamics.py", desc: "Расчёт термодинамических параметров системы" },
    { name: "phase_analyzer.py", desc: "Анализ фазовых переходов в кластерах" },
    { name: "visualization.py", desc: "Визуализация результатов моделирования" },
    { name: "main.py", desc: "Основной скрипт для запуска моделирования" }
  ];

  const fileColors = [
    "from-gray-100 to-blue-50",
    "from-gray-100 to-indigo-50",
    "from-gray-100 to-blue-50",
    "from-gray-100 to-indigo-50",
    "from-gray-100 to-blue-50",
    "from-gray-100 to-indigo-50"
  ];

  return (
    <section 
      ref={ref} 
      className="min-h-screen py-12 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 mb-6 pt-4">Ресурсы проекта</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Материалы и исходный код для изучения и использования
            </p>
          </div>
        </FadeInSection>
        
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={0.1}>
            <motion.div 
              className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl shadow-md mb-10 relative overflow-hidden border border-gray-200"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-100 rounded-full opacity-20 transform rotate-12"></div>
              <div className="absolute right-10 bottom-10 w-20 h-20 bg-indigo-100 rounded-full opacity-30 transform -rotate-12"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-700 mr-4 border border-blue-100">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Репозиторий проекта</h3>
                    <p className="text-gray-600">Исходный код и файлы исследования кластеров</p>
                  </div>
                </div>
                <motion.a 
                  href="https://github.com/molecular-dynamics" 
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
                  whileTap={{ scale: 0.95 }}
                >
                  GitHub
                </motion.a>
              </div>
            </motion.div>
          </FadeInSection>
          
          <FadeInSection delay={0.4}>
            <div className="mt-10 mb-10">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 mb-6">Исходный код проекта</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {sourceFiles.map((file, index) => (
                  <motion.div 
                    key={index} 
                    className={`bg-gradient-to-r ${fileColors[index]} rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow relative overflow-hidden border border-gray-200`}
                    whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-blue-100 rounded-full opacity-20"></div>
                    
                    <div className="flex items-start relative z-10">
                      <div>
                        <svg className="w-5 h-5 text-blue-700 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12H15M9 16H15M9 8H9.01M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{file.name}</h4>
                        <p className="text-gray-600 text-xs mt-1">{file.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        
          <div className="grid md:grid-cols-2 gap-8">
            <FadeInSection delay={0.2}>
              <motion.div 
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-md p-6 h-full relative overflow-hidden border border-gray-200"
                whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-700 mr-4 border border-blue-100">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Литература</h3>
                </div>
                <div className="pb-4 relative z-10">
                  <p className="font-medium text-gray-800">Медведев Д. А., Куперштох А. Л., Прууэл Э. Р., Сатонкина Н. П., Карпов Д. И. Моделирование физических процессов и явлений на ПК</p>
                  <p className="text-gray-600 text-sm mt-2">Учебное пособие, Новосибирск: Новосиб. гос. ун-т., 2010. — 101 с.</p>
                </div>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <motion.div 
                className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl shadow-md p-6 h-full relative overflow-hidden border border-gray-200"
                whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-100 rounded-full opacity-20"></div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="bg-indigo-50 p-3 rounded-lg text-indigo-700 mr-4 border border-indigo-100">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Программные инструменты</h3>
                </div>
                <div className="pb-4 relative z-10">
                  <p className="font-medium text-gray-800">Python + NumPy/SciPy/Matplotlib</p>
                  <p className="text-gray-600 text-sm mt-2">Язык программирования и библиотеки для научных расчетов и визуализации</p>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
});

ResourcesSection.displayName = 'ResourcesSection';

export default ResourcesSection;
