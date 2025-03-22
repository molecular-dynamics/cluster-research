import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useAnimationControls } from 'framer-motion';

// Компонент для плавного появления при скролле
const FadeInWhenVisible = ({ children, delay = 0, threshold = 0.1, className = "" }) => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Компонент для интерактивной визуализации гексагонального кластера
const HexagonalClusterVisualization = () => {
  const [numShells, setNumShells] = useState(2);
  const [particlePositions, setParticlePositions] = useState([]);
  const [bonds, setBonds] = useState([]);
  const svgRef = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // Создание позиций частиц для гексагонального кластера
    const generateHexagonalCluster = (shells) => {
      const positions = [];
      const bondsList = [];
      const bondCutoff = 1.5;
      
      // Добавляем центральную частицу
      positions.push({ x: 0, y: 0 });
      
      // Расстояние между частицами
      const b = 1.0;
      
      // Добавляем оболочки
      for (let shell = 1; shell <= shells; shell++) {
        // Каждая оболочка содержит 6*shell частиц
        for (let i = 0; i < 6 * shell; i++) {
          // Угол и радиус для создания гексагональной структуры
          const angle = 2 * Math.PI * i / (6 * shell);
          
          // Координаты частицы в оболочке shell
          const x = shell * b * Math.cos(angle);
          const y = shell * b * Math.sin(angle);
          
          positions.push({ x, y });
        }
      }
      
      // Создаем связи между близкими частицами
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
    
    // Указываем новый ключ рендеринга для обновления анимаций
    setRenderKey(prev => prev + 1);
  }, [numShells]);

  // Расчет размеров SVG и масштабирование
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
            {/* Связи между частицами */}
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
            
            {/* Частицы */}
            {particlePositions.map((particle, index) => (
              <motion.circle
                key={`particle-${index}`}
                cx={transformCoordinate(particle.x)}
                cy={transformCoordinate(particle.y)}
                r={index === 0 ? 16 : 14} // Центральная чуть больше
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

// Компонент для визуализации потенциала Леннард-Джонса
const LennardJonesPotential = () => {
  const [epsilon, setEpsilon] = useState(1);
  const [sigma, setSigma] = useState(1);
  const svgRef = useRef(null);
  
  // Рассчет значений для графика
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
  
  // Параметры для SVG
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
            {/* Оси координат */}
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
            
            {/* Подписи осей */}
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
            
            {/* Нулевая линия */}
            <line 
              x1={padding} 
              y1={svgHeight - padding - (-minValue) * yScale} 
              x2={svgWidth - padding} 
              y2={svgHeight - padding - (-minValue) * yScale} 
              stroke="gray" 
              strokeDasharray="4" 
            />
            
            {/* Минимум потенциальной энергии */}
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
            
            {/* График */}
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
            <p className="font-mono text-center bg-white p-2 rounded">
              U(r) = ε[(σ/r)¹² - 2(σ/r)⁶]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент для анимации кривой плавления
const MeltingCurveAnimation = () => {
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
              {/* Оси */}
              <line x1="50" y1="250" x2="350" y2="250" stroke="black" strokeWidth="1.5" />
              <line x1="50" y1="50" x2="50" y2="250" stroke="black" strokeWidth="1.5" />
              
              {/* Подписи осей */}
              <text x="200" y="280" textAnchor="middle" className="text-sm">Энергия на частицу E/N</text>
              <text x="20" y="150" textAnchor="middle" transform="rotate(-90, 20, 150)" className="text-sm">Температура T</text>
              
              {/* Кривая нагрева */}
              <motion.path 
                d="M50,250 Q100,240 120,230 T180,200 Q200,180 230,150 T280,100 Q300,80 350,50" 
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Кривая охлаждения */}
              <motion.path 
                d="M350,50 Q300,70 280,90 T230,120 Q200,150 180,180 T120,220 Q100,230 50,250" 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Обозначения */}
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

// Компонент для анимации флуктуаций длины связи
const BondFluctuationAnimation = () => {
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
            <p className="font-mono text-center bg-white p-2 rounded mt-2">
              δ = √[2/(N(N-1)) ∑(⟨r²⟩ - ⟨r⟩²)/⟨r⟩]
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
              {/* Оси */}
              <line x1="50" y1="250" x2="350" y2="250" stroke="black" strokeWidth="1.5" />
              <line x1="50" y1="50" x2="50" y2="250" stroke="black" strokeWidth="1.5" />
              
              {/* Подписи осей */}
              <text x="200" y="280" textAnchor="middle" className="text-sm">Шаг моделирования</text>
              <text x="20" y="150" textAnchor="middle" transform="rotate(-90, 20, 150)" className="text-sm">Флуктуация длины связи δ</text>
              
              {/* Порог плавления */}
              <line x1="50" y1="180" x2="350" y2="180" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5" />
              <text x="360" y="180" textAnchor="start" fill="#EF4444" className="text-xs">δ = 0.1</text>
              
              {/* Кривая флуктуаций */}
              <motion.path 
                d="M50,230 Q75,228 100,225 T150,220 Q175,215 200,200 T210,180 Q220,150 230,120 T250,90 Q275,70 300,60 T350,50" 
                fill="none" 
                stroke="#8B5CF6" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              
              {/* Обозначение фазового перехода */}
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
              
              {/* Обозначения областей */}
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

// Компонент для размещения презентаций и видео
const StageMedia = ({ stage }) => {
  const [activeTab, setActiveTab] = useState('presentations');

  return (
    <div className="mt-8">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'presentations' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('presentations')}
        >
          Презентации
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'videos' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('videos')}
        >
          Видеозаписи защит
        </button>
      </div>
      
      <div className="mt-4">
        {activeTab === 'presentations' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {name: "Лихтенштейн Алина", file: "presentation_stage1_likhtenshtein.pdf"},
              {name: "Рогожина Надежда", file: "presentation_stage1_rogozhina.pdf"},
              {name: "Шилоносов Данил", file: "presentation_stage1_shilonosov.pdf"},
              {name: "Гаинэ Андрей", file: "presentation_stage1_gaine.pdf"}
            ].map((presenter, index) => (
              <div key={index} className={`bg-white rounded-lg border ${stage === 1 ? 'border-blue-200' : 'border-gray-200'} p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{presenter.name}</p>
                    <p className="text-xs text-gray-500">{presenter.file}</p>
                  </div>
                  {stage === 1 ? (
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">
                      Скачать
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">Будет доступно позже</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {name: "Лихтенштейн Алина", platform: "RuTube"},
              {name: "Рогожина Надежда", platform: "PLVideo"},
              {name: "Шилоносов Данил", platform: "RuTube"},
              {name: "Гаинэ Андрей", platform: "PLVideo"}
            ].map((presenter, index) => (
              <div key={index} className={`bg-white rounded-lg border ${stage === 1 ? 'border-blue-200' : 'border-gray-200'} p-4`}>
                {stage === 1 ? (
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-2">
                      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500">Видео защиты</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{presenter.name}</p>
                        <p className="text-xs text-gray-500">{presenter.platform}</p>
                      </div>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">
                        Смотреть
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center">
                    <span className="text-gray-400">Видео будет доступно после защиты этапа</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Основной компонент сайта
const DynamicProjectWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Рефы для секций
  const homeRef = useRef(null);
  const teamRef = useRef(null);
  const stagesRef = useRef(null);
  const resourcesRef = useRef(null);
  
  // Отслеживание активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      const homeRect = homeRef.current?.getBoundingClientRect();
      const teamRect = teamRef.current?.getBoundingClientRect();
      const stagesRect = stagesRef.current?.getBoundingClientRect();
      const resourcesRect = resourcesRef.current?.getBoundingClientRect();
      
      const windowHeight = window.innerHeight;
      const offset = windowHeight * 0.3;
      
      if (homeRect && homeRect.top <= offset && homeRect.bottom > offset) {
        setActiveSection('home');
      } else if (teamRect && teamRect.top <= offset && teamRect.bottom > offset) {
        setActiveSection('team');
      } else if (stagesRect && stagesRect.top <= offset && stagesRect.bottom > offset) {
        setActiveSection('stages');
      } else if (resourcesRect && resourcesRect.top <= offset && resourcesRect.bottom > offset) {
        setActiveSection('resources');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Скролл к указанной секции
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Анимация для прогресс-бара скролла
  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1]);
  
  // Данные о команде
  const teamMembers = [
    { 
      id: 1, 
      name: "Лихтенштейн Алина", 
      role: "Модель", 
      stage: 1,
      photo: "/api/placeholder/200/200"
    },
    { 
      id: 2, 
      name: "Рогожина Надежда", 
      role: "Алгоритмы", 
      stage: 2,
      photo: "/api/placeholder/200/200"
    },
    { 
      id: 3, 
      name: "Шилоносов Данил", 
      role: "Комплексы программ", 
      stage: 3,
      photo: "/api/placeholder/200/200"
    },
    { 
      id: 4, 
      name: "Гаинэ Андрей", 
      role: "Защита проекта", 
      stage: 4,
      photo: "/api/placeholder/200/200"
    }
  ];
  
  // Этапы проекта
  const projectStages = [
    {
      id: 1,
      title: "Модель",
      description: "Презентация по научной проблеме. Теоретическое описание задачи. Описание модели.",
      presenter: "Лихтенштейн Алина",
      content: "Изучение теоретических основ метода молекулярной динамики и построение модели для исследования процессов плавления и затвердевания малых кластеров с \"магическими\" числами частиц.",
      tasks: [
        "Изучить теоретические основы метода молекулярной динамики",
        "Рассмотреть особенности фазовых переходов в малых кластерах",
        "Разработать физическую модель для исследования плавления и затвердевания малых кластеров с \"магическими\" числами частиц (7, 19, 37)",
        "Определить необходимые параметры и алгоритмы для дальнейшего моделирования"
      ]
    },
    {
      id: 2,
      title: "Алгоритмы",
      description: "Презентация по алгоритмам решения задачи.",
      presenter: "Рогожина Надежда",
      content: "Разработка и оптимизация алгоритмов для численного моделирования плавления и затвердевания малых кластеров.",
      tasks: [
        "Реализация алгоритма Верле в скоростной форме",
        "Оптимизация расчета потенциала Леннард-Джонса",
        "Разработка алгоритмов для анализа термодинамических характеристик",
        "Проектирование алгоритмов для визуализации результатов"
      ]
    },
    {
      id: 3,
      title: "Комплексы программ",
      description: "Описание программной реализации проекта.",
      presenter: "Шилоносов Данил",
      content: "Программная реализация моделирования, включающая модули для расчета, анализа и визуализации данных.",
      tasks: [
        "Разработка основного вычислительного модуля",
        "Создание программы для анализа фазовых переходов",
        "Реализация средств визуализации динамики кластеров",
        "Тестирование и оптимизация программного комплекса"
      ]
    },
    {
      id: 4,
      title: "Защита проекта",
      description: "Коллективное обсуждение результата проекта, самооценка деятельности.",
      presenter: "Гаинэ Андрей",
      content: "Презентация полученных результатов, обсуждение достижений и перспектив дальнейшего развития проекта.",
      tasks: [
        "Подготовка обобщающей презентации по проекту",
        "Анализ полученных результатов и их научная интерпретация",
        "Сравнение полученных данных с литературными источниками",
        "Формулировка выводов и определение направлений дальнейших исследований"
      ]
    }
  ];
  
  // Навигационные элементы
  const navItems = [
    { id: 'home', label: 'Главная', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10.25V20C3 20.5523 3.44771 21 4 21H8.42857C8.98086 21 9.42857 20.5523 9.42857 20V15.2143C9.42857 14.662 9.87629 14.2143 10.4286 14.2143H13.5714C14.1237 14.2143 14.5714 14.662 14.5714 15.2143V20C14.5714 20.5523 15.0191 21 15.5714 21H20C20.5523 21 21 20.5523 21 20V10.25C21 9.93524 20.8518 9.63885 20.6 9.45L12.6 3.45C12.2466 3.17467 11.7534 3.17467 11.4 3.45L3.4 9.45C3.14819 9.63885 3 9.93524 3 10.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg> },
    { id: 'team', label: 'Команда', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M16.6438 16.1429C15.6563 14.4702 13.9873 13.3333 12 13.3333C10.0127 13.3333 8.34369 14.4702 7.35618 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35618 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg> },
    { id: 'stages', label: 'Этапы', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg> },
    { id: 'resources', label: 'Ресурсы', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Прогресс-бар скролла */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Навигация */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300" 
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: scrollYProgress.get() > 0.05 ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none"
        }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden">
                <img src="/api/placeholder/40/40" alt="РУДН" className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Исследование плавления малых кластеров</h1>
                <p className="text-xs text-gray-500">РУДН &bull; Математическое моделирование (02.03.02)</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(
                    item.id === 'home' ? homeRef : 
                    item.id === 'team' ? teamRef : 
                    item.id === 'stages' ? stagesRef : 
                    resourcesRef
                  )}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    activeSection === item.id 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            
            {/* Мобильное меню */}
            <div className="md:hidden">
              <button className="p-2 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Главная секция */}
      <section 
        ref={homeRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        {/* Фоновые элементы */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-50 blur-3xl opacity-60"
            style={{ 
              transform: `translate(${scrollYProgress.get() * 100}px, ${scrollYProgress.get() * -50}px)` 
            }}
          />
          <div 
            className="absolute bottom-1/3 -right-24 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-60"
            style={{ 
              transform: `translate(${scrollYProgress.get() * -100}px, ${scrollYProgress.get() * 50}px)` 
            }}
          />
          <div 
            className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-purple-50 blur-3xl opacity-40"
            style={{ 
              transform: `translate(${scrollYProgress.get() * -50}px, ${scrollYProgress.get() * 100}px)` 
            }}
          />
        </div>
      
        <div className="container mx-auto px-4 py-24 z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-3 py-1 bg-blue-100 rounded-full text-blue-800 text-sm font-semibold">
              Групповой научный проект
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 leading-tight">
              Исследование плавления и затвердевания малых кластеров
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              Изучение фазовых переходов в кластерах с "магическими" числами частиц методами молекулярной динамики
            </p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <button 
                onClick={() => scrollToSection(stagesRef)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Изучить проект
              </button>
              <button 
                onClick={() => scrollToSection(resourcesRef)}
                className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg shadow-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Исходный код
              </button>
            </motion.div>
          </motion.div>
          
          {/* Основные особенности проекта */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl mb-4 flex items-center justify-center text-blue-600">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.48998 5.03995L11 2L12.51 5.04005C12.643 5.30221 12.8447 5.52392 13.0924 5.67535C13.34 5.82677 13.6239 5.90134 13.913 5.89C14.183 5.89 15.217 5.67 16.45 8.5C17.739 11.4471 19.849 12.303 19.87 12.31C19.9916 12.3724 20.1213 12.4129 20.2555 12.4295C20.3897 12.4461 20.5262 12.4384 20.6568 12.407C20.7875 12.3755 20.9099 12.3209 21.0178 12.2461C21.1256 12.1713 21.2172 12.0775 21.288 11.97L22 10.7V13.485L21.915 13.575C21.8446 13.6452 21.7605 13.7006 21.6677 13.7377C21.575 13.7749 21.4756 13.7932 21.376 13.792C21.266 13.792 18.045 13.792 16.196 9.33795C14.849 6.08995 14.265 7.46995 13.913 7.46005H10.087C9.7351 7.46026 9.38728 7.35355 9.09226 7.15432C8.79723 6.95508 8.56964 6.67291 8.44 6.34295L7 3.33295V6.31695L7.713 7.58995C7.78328 7.69728 7.8752 7.79111 7.98353 7.86593C8.09187 7.94075 8.21444 7.99513 8.34519 8.0266C8.47593 8.05807 8.61247 8.06599 8.74656 8.04994C8.88064 8.03389 9.01024 7.99421 9.12604 7.93295C9.13604 7.92795 11.282 6.85895 12.559 9.81695C13.819 12.7259 14.853 12.506 15.123 12.506C15.4121 12.4946 15.6959 12.5692 15.9436 12.7206C16.1912 12.872 16.3929 13.0937 16.526 13.356L18 16.367V13.386L16.557 10.413C16.4274 10.0828 16.3999 9.72534 16.4775 9.3806C16.555 9.03586 16.7352 8.72159 16.996 8.47895C17.2568 8.23631 17.5874 8.07499 17.9413 8.01634C18.2951 7.95769 18.6587 8.00461 18.986 8.15005C19.006 8.15805 20.08 8.71005 19.017 5.82005C18.042 3.18005 16.92 3.02005 16.666 3.00005H12.684C12.3319 2.99994 11.9841 2.89345 11.689 2.6946C11.3939 2.49574 11.1662 2.21408 11.037 1.88495L9.48998 5.03995ZM2 11.702L3.49 14.67C3.61938 14.9991 3.64715 15.3555 3.57002 15.6993C3.49289 16.0431 3.31351 16.3566 3.05386 16.5988C2.79422 16.841 2.46494 17.0023 2.11227 17.0616C1.7596 17.1209 1.39705 17.0751 1.07 16.9311C1.05 16.9221 0 16.3811 1.017 19.1921C1.992 21.8121 3.114 21.9721 3.368 21.9921H7.316C7.66813 21.9922 8.01587 22.0986 8.31103 22.2975C8.60618 22.4963 8.83382 22.778 8.963 23.1071L10.51 20.9631L9 18.0001C8.86695 17.738 8.66528 17.5162 8.41761 17.3648C8.16994 17.2134 7.8861 17.1388 7.597 17.1501C7.327 17.1501 6.293 17.3701 5.06 14.5401C3.771 11.5931 1.661 10.7371 1.64 10.7301C1.51835 10.6677 1.3887 10.6271 1.25448 10.6105C1.12026 10.5939 0.983779 10.6016 0.853166 10.633C0.722554 10.6645 0.600104 10.7191 0.492264 10.7939C0.384424 10.8686 0.292814 10.9624 0.222 11.0701L0 12.3431V9.56205L0.13 9.39005C0.200411 9.3199 0.28452 9.26447 0.377279 9.22736C0.470038 9.19025 0.569459 9.1719 0.67 9.17205C0.78 9.17205 4 9.17205 5.85 13.6251C7.196 16.8731 7.78 15.4931 8.132 15.5031H11.96C12.3108 15.5027 12.6577 15.6091 12.9518 15.8078C13.246 16.0064 13.473 16.2879 13.602 16.6171L15 19.6001V16.6171L14.252 15.4001C14.1817 15.2928 14.0898 15.199 13.9815 15.1241C13.8732 15.0493 13.7506 14.9947 13.62 14.9631C13.4894 14.9316 13.3529 14.9239 13.2187 14.9405C13.0845 14.9571 12.9548 14.9976 12.833 15.0601C12.823 15.0651 10.7 16.1231 9.47 13.1831C8.213 10.2781 7.18 10.4981 6.91 10.4981C6.62186 10.5094 6.33802 10.4348 6.09035 10.2834C5.84268 10.132 5.64101 9.91026 5.508 9.64814L4 6.64014V9.62214L5.48 12.5721C5.60975 12.902 5.63756 13.2642 5.56046 13.6086C5.48336 13.953 5.30428 14.2671 5.04495 14.5097C4.78563 14.7523 4.45673 14.9138 4.10442 14.9728C3.75211 15.0318 3.3899 14.9854 3.063 14.8411C3.043 14.8341 1.969 14.2811 3.033 17.1721C4.008 19.8121 5.13 19.9721 5.384 19.9921H9.367C9.71886 19.9921 10.0664 20.0984 10.3613 20.2971C10.6563 20.4958 10.8839 20.7773 11.013 21.1061L12.52 18.0001L11 15.0001C10.868 14.738 10.6664 14.5161 10.4189 14.3645C10.1714 14.213 9.88783 14.1382 9.599 14.1491C9.329 14.1491 8.295 14.3691 7.062 11.5391C5.773 8.59205 3.663 7.73605 3.642 7.72905C3.38975 7.60413 3.10493 7.56163 2.82596 7.60807C2.54699 7.65452 2.28848 7.78791 2.081 7.99005L2 8.07305V11.702Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Фазовые переходы</h3>
                <p className="text-gray-600">Изучение уникальных особенностей плавления и затвердевания наноразмерных систем</p>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.3}>
              <div className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform border border-gray-100">
                <div className="w-14 h-14 bg-purple-100 rounded-xl mb-4 flex items-center justify-center text-purple-600">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">"Магические" числа</h3>
                <p className="text-gray-600">Исследование кластеров с особой стабильностью при числах частиц 7, 19, 37</p>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.5}>
              <div className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform border border-gray-100">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center text-indigo-600">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3282 7.67842C21.7181 11.0683 21.7181 16.5487 18.3282 19.9387C14.9383 23.3286 9.45792 23.3286 6.06799 19.9387C2.67806 16.5487 2.67806 11.0683 6.06799 7.67842C9.45792 4.28848 14.9383 4.28848 18.3282 7.67842" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.3282 4.06152C14.9383 0.671583 9.45792 0.671582 6.06799 4.06152C2.67806 7.45145 2.67806 12.9318 6.06799 16.3218C9.45792 19.7117 14.9383 19.7117 18.3282 16.3218C21.7181 12.9318 21.7181 7.45146 18.3282 4.06152" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12.198" cy="12.1982" r="2.4" transform="rotate(45 12.198 12.1982)" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Молекулярная динамика</h3>
                <p className="text-gray-600">Применение численных методов для моделирования поведения многочастичных систем</p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Секция "Команда" */}
      <section 
        ref={teamRef} 
        className="min-h-screen py-24"
      >
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Наша команда</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Каждый участник команды отвечает за отдельный этап проекта
              </p>
            </div>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <FadeInWhenVisible key={member.id} delay={0.2 * index}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  <div className="h-48 overflow-hidden bg-gradient-to-r from-blue-200 to-indigo-100 relative">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mb-4 -mt-12 border-4 border-white shadow-lg">
                      {member.stage}
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <button 
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Секция "Этапы проекта" */}
      <section 
        ref={stagesRef} 
        className="min-h-screen py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Этапы проекта</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Комплексный подход к исследованию фазовых переходов в малых кластерах
              </p>
            </div>
          </FadeInWhenVisible>
          
          <div className="max-w-6xl mx-auto">
            {/* Этапы проекта с вкладками */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center mb-4">
                {projectStages.map((stage) => (
                  <FadeInWhenVisible key={stage.id} delay={0.1 * stage.id}>
                    <button
                      className={`px-6 py-3 m-1 rounded-lg text-center transition-all ${
                        stage.id === 1
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-bold">Этап {stage.id}</div>
                      <div className="text-sm opacity-80">{stage.title}</div>
                    </button>
                  </FadeInWhenVisible>
                ))}
              </div>
            </div>
            
            {/* Содержимое первого этапа */}
            <FadeInWhenVisible>
              <div className="bg-white rounded-xl shadow-xl p-6 mb-16">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-800">{projectStages[0].title}</h3>
                    <p className="text-gray-500">{projectStages[0].presenter}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-8">
                  {projectStages[0].content}
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-8">
                  <h4 className="font-bold text-gray-800 mb-2">Задачи этапа:</h4>
                  <ul className="space-y-2">
                    {projectStages[0].tasks.map((task, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Интерактивные визуализации */}
                <div className="space-y-8">
                  <HexagonalClusterVisualization />
                  <LennardJonesPotential />
                  <MeltingCurveAnimation />
                  <BondFluctuationAnimation />
                  
                  {/* Область для презентаций и видео */}
                  <StageMedia stage={1} />
                </div>
              </div>
            </FadeInWhenVisible>
            
            {/* Будущие этапы */}
            {[1, 2, 3].map(i => (
              <FadeInWhenVisible key={i} delay={0.2 * i}>
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 opacity-60">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl">
                      {i + 1}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-gray-800">{projectStages[i].title}</h3>
                      <p className="text-gray-500">{projectStages[i].presenter}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-8">
                    {projectStages[i].content}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-8">
                    <h4 className="font-bold text-gray-800 mb-2">Задачи этапа:</h4>
                    <ul className="space-y-2">
                      {projectStages[i].tasks.map((task, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Область для презентаций и видео */}
                  <StageMedia stage={i + 1} />
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Секция "Ресурсы" */}
      <section 
        ref={resourcesRef} 
        className="min-h-screen py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Ресурсы проекта</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Материалы и исходный код для изучения и использования
              </p>
            </div>
          </FadeInWhenVisible>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white rounded-xl shadow-xl p-6 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Литература</h3>
                <div className="border-b border-gray-100 pb-6">
                  <p className="font-medium text-gray-800">Медведев Д. А., Куперштох А. Л., Прууэл Э. Р., Сатонкина Н. П., Карпов Д. И. Моделирование физических процессов и явлений на ПК</p>
                  <p className="text-gray-600 text-sm mt-1">Учебное пособие, Новосибирск: Новосиб. гос. ун-т., 2010. — 101 с.</p>
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white rounded-xl shadow-xl p-6 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Программные инструменты</h3>
                <div className="grid gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9.75V16.5M12 9.75L16.25 7.25M12 9.75L7.75 7.25M3.75 7.25V16.25C3.75 16.25 7.25 19.25 12 19.25C16.75 19.25 20.25 16.25 20.25 16.25V7.25C20.25 7.25 16.75 4.25 12 4.25C7.25 4.25 3.75 7.25 3.75 7.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Python + NumPy/SciPy/Matplotlib</h4>
                      <p className="text-gray-600 text-sm">Язык программирования и библиотеки для научных расчетов и визуализации</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 9L19 4M19 4H14M19 4V9M10 15L5 20M5 20H10M5 20V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Собственный вычислительный комплекс</h4>
                      <p className="text-gray-600 text-sm">Разработанный для проекта код молекулярной динамики</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 mr-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 17L22 12L17 7M7 7L2 12L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Репозиторий проекта</h4>
                      <p className="text-gray-600 text-xs">Исходный код и файлы проекта</p>
                    </div>
                    <button className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Скачать
                    </button>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.3} className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Исходный код проекта</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {name: "cluster_generator.py", desc: "Генерация начальных конфигураций кластеров с 'магическими' числами частиц"},
                    {name: "md_engine.py", desc: "Основной модуль молекулярной динамики с алгоритмом Верле"},
                    {name: "thermodynamics.py", desc: "Расчёт термодинамических параметров системы"},
                    {name: "phase_analyzer.py", desc: "Анализ фазовых переходов в кластерах"},
                    {name: "visualization.py", desc: "Визуализация результатов моделирования"},
                    {name: "main.py", desc: "Основной скрипт для запуска моделирования"}
                  ].map((file, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-gray-800">{file.name}</h4>
                          <p className="text-gray-600 text-xs">{file.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="РУДН" className="h-full w-full object-cover" />
                </div>
                <h2 className="ml-3 text-xl font-bold">Исследование плавления малых кластеров</h2>
              </div>
              <p className="text-gray-400">Российский университет дружбы народов</p>
              <p className="text-gray-400 mt-1">Математическое моделирование (02.03.02)</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 22V18C15.1392 16.7473 14.78 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8 3.5C6 2 5 2 5 2C4.7 3.15 4.7 4.35 5 5.5C4.27362 6.51588 3.91608 7.75279 4 9C4 12.5 7 14.5 10 14.5C9.61 14.99 9.32 15.55 9.15 16.15C8.98 16.75 8.93 17.38 9 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 18C4.49 20 4 16 2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4C22 4 21.3 6.1 20 7.4C21.6 17.4 10.6 24.7 2 19C4.2 19.1 6.4 18.4 8 17C3 15.5 0.5 9.6 3 5C5.2 7.6 8.6 9.1 12 9C11.1 4.8 16 2.4 19 5.2C20.1 5.2 22 4 22 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm">&copy; 2025 Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Кнопка прокрутки наверх */}
      <motion.button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          y: scrollYProgress.get() > 0.1 ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
};

export default DynamicProjectWebsite;
