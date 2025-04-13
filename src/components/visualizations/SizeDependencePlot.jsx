import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const sampleMeltingData = {
  7: 0.35,
  19: 0.45,
  37: 0.50,
};

const linearRegression = (x, y) => {
  if (x.length < 2) return { slope: 0, intercept: y[0] || 0 };
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  const denominator = n * sumX2 - sumX * sumX;
  if (Math.abs(denominator) < 1e-10) return { slope: 0, intercept: sumY / n };

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
};


const SizeDependencePlot = () => {
  const [includedSizes, setIncludedSizes] = useState(Object.keys(sampleMeltingData).map(Number));

  const handleCheckboxChange = (size) => {
    setIncludedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size].sort((a, b) => a - b)
    );
  };

  const plotData = useMemo(() => {
    const points = includedSizes.map(N => ({
      N,
      Tmelt: sampleMeltingData[N],
      x: N**(-1/3)
    }));

    const xValues = points.map(p => p.x);
    const yValues = points.map(p => p.Tmelt);

    const { slope, intercept } = linearRegression(xValues, yValues);
    const T_bulk = intercept;
    const c_const = -slope;

    return { points, T_bulk, c_const, xValues };
  }, [includedSizes]);

  const svgWidth = 500;
  const svgHeight = 350;
  const padding = 50;
  const xDomain = [0, 0.6];
  const yDomain = [0.2, 0.7];

  const xScale = (val) => padding + (val - xDomain[0]) / (xDomain[1] - xDomain[0]) * (svgWidth - 2 * padding);
  const yScale = (val) => svgHeight - padding - (val - yDomain[0]) / (yDomain[1] - yDomain[0]) * (svgHeight - 2 * padding);

  const lineX1 = xDomain[0];
  const lineY1 = plotData.T_bulk + (-plotData.c_const) * lineX1;
  const lineX2 = xDomain[1];
  const lineY2 = plotData.T_bulk + (-plotData.c_const) * lineX2;

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 overflow-hidden mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Зависимость T<sub>плавления</sub> от размера кластера</h3>
      <div className="md:flex gap-6">
        <div className="md:w-2/3">
           <svg width={svgWidth} height={svgHeight} className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl">
             <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="black" strokeWidth="1.5" />
             <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="black" strokeWidth="1.5" />
             <text x={svgWidth / 2} y={svgHeight - 15} textAnchor="middle" className="text-sm">N<sup>-1/3</sup></text>
             <text x={15} y={svgHeight / 2} textAnchor="middle" transform={`rotate(-90, 15, ${svgHeight / 2})`} className="text-sm">T<sub>melt</sub></text>

             {includedSizes.length >= 2 && (
               <motion.line
                 x1={xScale(lineX1)} y1={yScale(lineY1)}
                 x2={xScale(lineX2)} y2={yScale(lineY2)}
                 stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4"
                 initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
               />
             )}

             {plotData.points.map(p => (
               <motion.circle
                 key={p.N}
                 cx={xScale(p.x)}
                 cy={yScale(p.Tmelt)}
                 r={6}
                 fill="#3B82F6"
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
               />
             ))}
              {plotData.points.map(p => (
                 <text key={`label-${p.N}`} x={xScale(p.x) + 8} y={yScale(p.Tmelt) + 4} fontSize="10" fill="#3B82F6">N={p.N}</text>
              ))}
           </svg>
        </div>
        <div className="md:w-1/3 mt-6 md:mt-0">
          <p className="text-gray-600 mb-4 text-sm">
            Температура плавления малых кластеров зависит от их размера N по закону:
            T<sub>melt</sub> ≈ T<sub>bulk</sub> - c/N<sup>1/3</sup>.
            Выберите точки для аппроксимации:
          </p>
          <div className="space-y-2 mb-4">
            {Object.keys(sampleMeltingData).map(sizeStr => {
              const size = Number(sizeStr);
              return (
                <label key={size} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includedSizes.includes(size)}
                    onChange={() => handleCheckboxChange(size)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">N = {size} (T<sub>melt</sub> ≈ {sampleMeltingData[size].toFixed(2)})</span>
                </label>
              );
            })}
          </div>
           <div className="p-3 bg-indigo-50 rounded-lg text-sm">
             <p className="font-semibold text-indigo-800">Результат аппроксимации:</p>
             {includedSizes.length >= 2 ? (
                <>
                  <p>T<sub>bulk</sub> ≈ {plotData.T_bulk.toFixed(3)}</p>
                  <p>c ≈ {plotData.c_const.toFixed(3)}</p>
                </>
             ) : (
                <p className="text-gray-500">Выберите хотя бы 2 точки</p>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SizeDependencePlot;
