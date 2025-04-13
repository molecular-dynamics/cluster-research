import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const grData = {
  solid: {
    r: [0.5, 1.0, 1.1, 1.5, 2.0, 2.1, 2.5, 3.0, 3.1, 3.5, 4.0, 4.1, 4.5, 5.0],
    g: [0.0, 0.1, 3.5, 0.8, 0.9, 1.8, 1.0, 1.0, 1.3, 1.0, 1.0, 1.1, 1.0, 1.0]
  },
  liquid: {
    r: [0.5, 0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0],
    g: [0.0, 0.1, 2.5, 1.5, 0.9, 1.1, 1.05, 1.0, 1.0, 1.0, 1.0, 1.0]
  }
};

const PairCorrelationFunctionPlot = () => {
  const [activeState, setActiveState] = useState('solid');

  const currentData = grData[activeState];

  const svgWidth = 500;
  const svgHeight = 350;
  const padding = 50;
  const xDomain = [0, 5.5];
  const yDomain = [0, 4.0];

  const xScale = (val) => padding + (val - xDomain[0]) / (xDomain[1] - xDomain[0]) * (svgWidth - 2 * padding);
  const yScale = (val) => svgHeight - padding - (val - yDomain[0]) / (yDomain[1] - yDomain[0]) * (svgHeight - 2 * padding);

  const pathData = currentData.r.map((rVal, i) => {
    const x = xScale(rVal);
    const y = yScale(currentData.g[i]);
    return (i === 0 ? 'M' : 'L') + x + ',' + y;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 overflow-hidden mt-8">
       <h3 className="text-2xl font-bold text-gray-800 mb-4">Парная корреляционная функция g(r)</h3>
       <div className="md:flex gap-6">
          <div className="md:w-2/3">
            <div className="mb-4 flex justify-center space-x-2">
               <button
                 onClick={() => setActiveState('solid')}
                 className={`px-3 py-1 rounded-md text-sm font-medium ${activeState === 'solid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 Твердое тело (Solid)
               </button>
               <button
                 onClick={() => setActiveState('liquid')}
                 className={`px-3 py-1 rounded-md text-sm font-medium ${activeState === 'liquid' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 Жидкость (Liquid)
               </button>
            </div>
            <svg width={svgWidth} height={svgHeight} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
               <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="black" strokeWidth="1.5" />
               <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="black" strokeWidth="1.5" />
               <text x={svgWidth / 2} y={svgHeight - 15} textAnchor="middle" className="text-sm">Расстояние r/b</text>
               <text x={15} y={svgHeight / 2} textAnchor="middle" transform={`rotate(-90, 15, ${svgHeight / 2})`} className="text-sm">g(r)</text>
               <line x1={padding} y1={yScale(1)} x2={svgWidth-padding} y2={yScale(1)} stroke="grey" strokeDasharray="4" />
               <text x={svgWidth-padding + 5} y={yScale(1)+4} className="text-xs" fill="grey">g(r)=1</text>

               <AnimatePresence mode="wait">
                  <motion.path
                    key={activeState}
                    d={pathData}
                    fill="none"
                    stroke={activeState === 'solid' ? "#3B82F6" : "#EF4444"}
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
               </AnimatePresence>
             </svg>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0">
             <p className="text-gray-600 mb-4 text-sm">
               Функция g(r) показывает вероятность найти другую частицу на расстоянии r от выбранной,
               относительно средней плотности. Она помогает различать структуру вещества.
             </p>
             {activeState === 'solid' && (
               <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                 <p className="font-semibold mb-1">Твердое тело:</p>
                 <ul className="list-disc list-inside space-y-1">
                    <li>Четкие пики на расстояниях, кратных межатомному.</li>
                    <li>Указывает на наличие дальнего порядка (кристаллическая структура).</li>
                    <li>Первый пик обычно высокий и узкий.</li>
                 </ul>
               </div>
             )}
              {activeState === 'liquid' && (
               <div className="p-3 bg-red-50 rounded-lg text-sm text-red-800">
                 <p className="font-semibold mb-1">Жидкость:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Первый пик широкий, показывает среднее расстояние до соседей.</li>
                    <li>Последующие пики быстро затухают.</li>
                    <li>Указывает на наличие только ближнего порядка.</li>
                 </ul>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default PairCorrelationFunctionPlot;
