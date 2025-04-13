import React from 'react';
import { motion } from 'framer-motion';

const BondFluctuation = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 overflow-hidden">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Флуктуации длины связи при нагреве</h3>
      <div className="md:flex gap-6">
        <div className="md:w-1/2">
          <p className="text-gray-600 mb-6">
            Важной характеристикой, позволяющей идентифицировать фазовый переход, является среднеквадратичная флуктуация длины связи δ.
            При начале плавления величина δ резко возрастает, что позволяет точно определить температуру фазового перехода.
          </p>
          <div className="p-4 bg-green-50 rounded-xl text-sm text-gray-700 mb-4">
            <p className="mb-2 font-semibold">Критерий Линдеманна</p>
            <p>
              Согласно критерию Линдеманна, плавление происходит, когда среднеквадратичная флуктуация длины связи
              превышает пороговое значение (обычно δ &gt; 0.1).
            </p>
            <p className="mt-2 text-center font-medium">
              Флуктуация длины связи характеризует отклонения от среднего расстояния между 
              соседними частицами. При переходе от твердого к жидкому состоянию эти отклонения резко возрастают.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-sm font-semibold text-blue-700">Фазовый переход</div>
            <div className="text-sm text-gray-500">Определяется при δ &gt; 0.1</div>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-3">
            <svg width="400" height="300" viewBox="0 0 400 300" className="mx-auto">
              <line x1="50" y1="250" x2="350" y2="250" stroke="black" strokeWidth="1.5" />
              <line x1="50" y1="50" x2="50" y2="250" stroke="black" strokeWidth="1.5" />
              
              <text x="200" y="280" textAnchor="middle" className="text-sm">Шаг моделирования</text>
              <text x="20" y="150" textAnchor="middle" transform="rotate(-90, 20, 150)" className="text-sm">Флуктуация длины связи δ</text>
              
              <line x1="50" y1="180" x2="350" y2="180" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5" />
              <text x="360" y="180" textAnchor="start" fill="#EF4444" className="text-xs">δ = 0.1</text>
              
              <motion.path 
                d="M50,230 Q75,228 100,225 T150,220 Q175,215 200,200 T210,180 Q220,150 230,120 T250,90 Q275,70 300,60 T350,50" 
                fill="none" 
                stroke="#8B5CF6" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              
              <motion.circle cx="210" cy="180" r="6" fill="#8B5CF6" 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.7, type: "spring" }}
              />
              <motion.text x="180" y="160" className="text-xs" fill="#8B5CF6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                Фазовый переход
              </motion.text>
              
              <motion.text x="100" y="210" className="text-sm font-semibold" fill="#1E40AF"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
              >
                Твердое состояние
              </motion.text>
              
              <motion.text x="270" y="100" className="text-sm font-semibold" fill="#B91C1C"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.4 }}
              >
                Жидкое состояние
              </motion.text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondFluctuation;
