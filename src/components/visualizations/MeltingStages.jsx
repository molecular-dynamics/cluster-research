import React from 'react';

const MeltingStages = () => {
  const stages = [
    {
      name: "Стадия 1",
      title: "Стабильная кристаллическая структура",
      description: "Кластер сохраняет идеальную гексагональную структуру с четко различимыми оболочками. Центральная частица окружена первой оболочкой из 6 частиц и второй оболочкой из 12 частиц. Все частицы находятся в равновесных положениях, система в упорядоченном твердом состоянии.",
    },
    {
      name: "Стадия 2",
      title: "Начало дестабилизации",
      description: "Появляются первые признаки нарушения идеальной структуры. Частицы во внутренней оболочке начинают совершать более значительные колебания. Заметны незначительные деформации структуры, особенно между первой и второй оболочками.",
    },
    {
      name: "Стадия 3",
      title: "Активная деформация структуры",
      description: "Происходит более выраженное нарушение правильной структуры. Частицы внутренней оболочки смещаются к центру, образуя более плотную центральную группу. Внешние частицы становятся более подвижными, четкое разделение на оболочки размывается.",
    },
    {
      name: "Стадия 4",
      title: "Выраженное плавление",
      description: "Структура кластера существенно нарушена. В центральной области образуется компактное ядро из сблизившихся частиц. Внешние частицы обладают высокой подвижностью. Оболочечная структура практически не просматривается. Система близка к полному плавлению.",
    },
    {
      name: "Стадия 5",
      title: "Расплавленное состояние",
      description: "Кластер полностью расплавлен, его структура кардинально отличается от начальной конфигурации. Частицы распределены неравномерно, с образованием временных локальных уплотнений. Исходная гексагональная симметрия полностью утрачена.",
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Стадии плавления кластера</h3>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Процесс плавления малого кластера происходит постепенно через несколько характерных стадий, 
          демонстрируя особенности фазовых переходов в наноразмерных системах.
        </p>
        
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div 
              key={index}
              className="border-2 border-blue-100 rounded-lg p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-center mb-2">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium mr-3 
                    ${index < 2 ? 'bg-blue-600' : index < 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                >
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{stage.name}</h4>
                  <p className="text-sm font-medium text-gray-700">{stage.title}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm pl-11">{stage.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-blue-800 mb-2">Ключевые особенности процесса плавления:</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Фазовый переход происходит не одномоментно, а постепенно</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Плавление начинается с более подвижных внешних оболочек</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Наблюдается оболочечное плавление, характерное для наносистем</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Температура плавления зависит от размера кластера</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeltingStages;