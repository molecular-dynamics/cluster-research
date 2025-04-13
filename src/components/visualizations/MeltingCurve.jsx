import React from 'react';
import { motion } from 'framer-motion';

const MeltingCurve = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 overflow-hidden">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Кривая плавления и гистерезис</h3>
      <div className="md:flex gap-6">
        <div className="md:w-1/2">
          <p className="text-gray-600 mb-6">
            При нагреве кластера наблюдается фазовый переход (плавление), который можно идентифицировать по изменению 
            зависимости энергии от температуры. При охлаждении фазовый переход (затвердевание) происходит при более 
            низкой температуре, что приводит к гистерезису.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-red-700">Нагрев</div>
              <div className="text-sm text-gray-500">Твердое → Жидкое</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-blue-700">Охлаждение</div>
              <div className="text-sm text-gray-500">Жидкое → Твердое</div>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-xl text-sm text-gray-700">
            <p className="mb-2 font-semibold">Гистерезис фазового перехода</p>
            <p>
              Гистерезис обусловлен метастабильными состояниями системы при фазовых переходах первого рода.
              Для малых кластеров этот эффект более выражен из-за большего вклада поверхностных эффектов.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-3">
            <svg width="400" height="300" viewBox="0 0 400 300" className="mx-auto">
              <line x1="50" y1="250" x2="350" y2="250" stroke="black" strokeWidth="1.5" />
              <line x1="50" y1="50" x2="50" y2="250" stroke="black" strokeWidth="1.5" />
              
              <text x="200" y="280" textAnchor="middle" className="text-sm">Энергия на частицу E/N</text>
              <text x="20" y="150" textAnchor="middle" transform="rotate(-90, 20, 150)" className="text-sm">Температура T</text>
              
              <motion.path 
                d="M50,250 Q100,240 120,230 T180,200 Q200,180 230,150 T280,100 Q300,80 350,50" 
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              <motion.path 
                d="M350,50 Q300,70 280,90 T230,120 Q200,150 180,180 T120,220 Q100,230 50,250" 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
              />
              
              <motion.circle cx="230" cy="135" r="6" fill="#EF4444" 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5, type: "spring" }}
              />
              <motion.text x="240" y="130" className="text-xs" fill="#EF4444"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.7 }}
              >
                Плавление
              </motion.text>
              
              <motion.circle cx="180" cy="180" r="6" fill="#3B82F6" 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.8, type: "spring" }}
              />
              <motion.text x="150" y="190" className="text-xs" fill="#3B82F6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                Затвердевание
              </motion.text>
              
              <motion.path 
                d="M230,135 L180,180" 
                stroke="#6B7280" 
                strokeWidth="1.5" 
                strokeDasharray="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.2 }}
              />
              
              <motion.text x="195" y="165" className="text-xs" fill="#6B7280"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
              >
                Гистерезис
              </motion.text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeltingCurve;
