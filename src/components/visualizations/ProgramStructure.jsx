import React from 'react';

const ProgramStructure = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Архитектура программного комплекса</h3>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Комплекс имеет модульную структуру, состоящую из взаимосвязанных компонентов, каждый из которых выполняет определенную функцию в процессе моделирования.
        </p>
        
        <div className="overflow-hidden rounded-xl border-2 border-blue-100 p-4 bg-blue-50">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-blue-800 mb-2">Основные модули</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-700 text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">1</div>
                  <div>
                    <span className="font-medium text-gray-900">main</span>
                    <p className="text-sm text-gray-600">Центральный модуль, координирующий работу всей программы</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-700 text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">2</div>
                  <div>
                    <span className="font-medium text-gray-900">cluster_generator</span>
                    <p className="text-sm text-gray-600">Создание начальных конфигураций кластеров</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-700 text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">3</div>
                  <div>
                    <span className="font-medium text-gray-900">md_engine</span>
                    <p className="text-sm text-gray-600">Движок молекулярной динамики с алгоритмом Верле</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-blue-800 mb-2">Аналитические модули</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-700 text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">4</div>
                  <div>
                    <span className="font-medium text-gray-900">thermodynamics</span>
                    <p className="text-sm text-gray-600">Расчет термодинамических характеристик системы</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-700 text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">5</div>
                  <div>
                    <span className="font-medium text-gray-900">phase_analyzer</span>
                    <p className="text-sm text-gray-600">Анализ фазовых переходов и параметров плавления</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-700 text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">6</div>
                  <div>
                    <span className="font-medium text-gray-900">visualization</span>
                    <p className="text-sm text-gray-600">Визуализация результатов моделирования</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-blue-800 mb-2">Преимущества модульной структуры</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">Гибкость в использовании компонентов</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">Расширяемость функциональности</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">Независимое тестирование модулей</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">Удобная настройка параметров</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramStructure;