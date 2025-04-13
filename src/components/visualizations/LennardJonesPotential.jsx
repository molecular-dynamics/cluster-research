import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const LennardJonesPotential = () => {
  const [epsilon, setEpsilon] = useState(1);
  const [sigma, setSigma] = useState(1);
  const svgRef = useRef(null);
  
  const calculateValues = () => {
    const points = [];
    for (let r = 0.8; r <= 3; r += 0.01) {
      const safeR = Math.max(r, 0.85);
      const value = epsilon * ((Math.pow(sigma/safeR, 12)) - 2 * (Math.pow(sigma/safeR, 6)));
      points.push({ r, value });
    }
    return points;
  };
  
  const points = calculateValues();
  const maxValue = Math.min(2, Math.max(...points.map(p => p.value)));
  const minValue = Math.max(-1.5, Math.min(...points.map(p => p.value)));
  
  const svgWidth = 500;
  const svgHeight = 300;
  const padding = 40;
  
  const xScale = (svgWidth - 2 * padding) / (3 - 0.8);
  const yScale = (svgHeight - 2 * padding) / (maxValue - minValue);
  
  const pathData = points.map((point, i) => {
    const x = padding + (point.r - 0.8) * xScale;
    const y = svgHeight - padding - (point.value - minValue) * yScale;
    return (i === 0 ? 'M' : 'L') + x + ',' + y;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 overflow-hidden">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Потенциал Леннард-Джонса</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <svg 
            ref={svgRef}
            width={svgWidth} 
            height={svgHeight} 
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl"
          >
            <line 
              x1={padding} 
              y1={svgHeight - padding} 
              x2={svgWidth - padding} 
              y2={svgHeight - padding} 
              stroke="black" 
              strokeWidth="1.5" 
            />
            <line 
              x1={padding} 
              y1={padding} 
              x2={padding} 
              y2={svgHeight - padding} 
              stroke="black" 
              strokeWidth="1.5" 
            />
            
            <text 
              x={svgWidth/2} 
              y={svgHeight - 10} 
              textAnchor="middle" 
              className="text-sm"
            >
              r/σ
            </text>
            <text 
              x={15} 
              y={svgHeight/2} 
              textAnchor="middle" 
              transform={`rotate(-90, 15, ${svgHeight/2})`} 
              className="text-sm"
            >
              U/ε
            </text>
            
            <line 
              x1={padding} 
              y1={svgHeight - padding - (-minValue) * yScale} 
              x2={svgWidth - padding} 
              y2={svgHeight - padding - (-minValue) * yScale} 
              stroke="gray" 
              strokeDasharray="4" 
            />
            
            <line 
              x1={padding + (1.12 - 0.8) * xScale} 
              y1={padding} 
              x2={padding + (1.12 - 0.8) * xScale} 
              y2={svgHeight - padding} 
              stroke="red" 
              strokeDasharray="4" 
            />
            <text 
              x={padding + (1.12 - 0.8) * xScale} 
              y={svgHeight - 10} 
              textAnchor="middle" 
              className="text-xs fill-red-600"
            >
              r₀
            </text>
            
            <motion.path 
              d={pathData} 
              fill="none" 
              stroke="#3B82F6" 
              strokeWidth="3" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Глубина потенциальной ямы (ε)
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={epsilon}
              onChange={(e) => setEpsilon(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-right text-sm text-gray-600">
              {epsilon.toFixed(1)}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Параметр σ
            </label>
            <input
              type="range"
              min="0.8"
              max="1.2"
              step="0.05"
              value={sigma}
              onChange={(e) => setSigma(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-right text-sm text-gray-600">
              {sigma.toFixed(2)}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-gray-700">
            <p className="mb-2">
              Потенциал Леннард-Джонса описывает взаимодействие между двумя нейтральными атомами или молекулами.
            </p>
            <p className="text-center font-medium">
              Применяется для моделирования сил притяжения и отталкивания между частицами.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LennardJonesPotential;
