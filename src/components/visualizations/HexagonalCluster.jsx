import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HexagonalCluster = () => {
  const [numShells, setNumShells] = useState(2);
  const [particlePositions, setParticlePositions] = useState([]);
  const [bonds, setBonds] = useState([]);
  const svgRef = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const generateHexagonalCluster = (shells) => {
      const positions = [];
      const bondsList = [];
      const bondCutoff = 1.5;
      
      positions.push({ x: 0, y: 0 });
      
      const b = 1.0;
      
      for (let shell = 1; shell <= shells; shell++) {
        for (let i = 0; i < 6 * shell; i++) {
          const angle = 2 * Math.PI * i / (6 * shell);
          
          const x = shell * b * Math.cos(angle);
          const y = shell * b * Math.sin(angle);
          
          positions.push({ x, y });
        }
      }
      
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < bondCutoff) {
            bondsList.push({ 
              i, j, 
              x1: positions[i].x, 
              y1: positions[i].y, 
              x2: positions[j].x, 
              y2: positions[j].y 
            });
          }
        }
      }
      
      return { positions, bondsList };
    };
    
    const { positions, bondsList } = generateHexagonalCluster(numShells);
    setParticlePositions(positions);
    setBonds(bondsList);
    
    setRenderKey(prev => prev + 1);
  }, [numShells]);

  const svgSize = 400;
  const padding = 40;
  const maxCoord = numShells + 0.5;
  const scale = (svgSize - 2 * padding) / (2 * maxCoord);
  
  const transformCoordinate = (coord) => {
    return padding + (coord + maxCoord) * scale;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Структура гексагонального кластера</h3>
          <p className="text-gray-600 mb-6">
            Визуализация кластера с "магическим" числом частиц. В таком кластере частицы расположены в гексагональной структуре, 
            где каждая следующая оболочка содержит на 6 частиц больше, чем предыдущая.
          </p>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Число оболочек: {numShells} (N = {1 + 3 * numShells * (numShells + 1)} частиц)
            </label>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={numShells}
              onChange={(e) => setNumShells(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-blue-700">7</div>
              <div className="text-sm text-gray-500">Частиц при n=1</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-blue-700">19</div>
              <div className="text-sm text-gray-500">Частиц при n=2</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-blue-700">37</div>
              <div className="text-sm text-gray-500">Частиц при n=3</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-blue-700">61</div>
              <div className="text-sm text-gray-500">Частиц при n=4</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-center">
          <svg
            ref={svgRef}
            width={svgSize}
            height={svgSize}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
            key={renderKey}
          >
            {bonds.map((bond, index) => (
              <motion.line
                key={`bond-${index}`}
                x1={transformCoordinate(bond.x1)}
                y1={transformCoordinate(bond.y1)}
                x2={transformCoordinate(bond.x2)}
                y2={transformCoordinate(bond.y2)}
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.005 }}
              />
            ))}
            
            {particlePositions.map((particle, index) => (
              <motion.circle
                key={`particle-${index}`}
                cx={transformCoordinate(particle.x)}
                cy={transformCoordinate(particle.y)}
                r={index === 0 ? 16 : 14}
                fill={index === 0 ? "#3B82F6" : "#60A5FA"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20, 
                  delay: 0.2 + index * 0.03
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HexagonalCluster;
