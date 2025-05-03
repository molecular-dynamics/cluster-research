import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInSection from '../ui/FadeInSection';
import StageMedia from '../ui/StageMedia';
import TimelineSlider from '../ui/TimelineSlider';
import HexagonalCluster from '../visualizations/HexagonalCluster';
import LennardJonesPotential from '../visualizations/LennardJonesPotential';
import MeltingCurve from '../visualizations/MeltingCurve';
import BondFluctuation from '../visualizations/BondFluctuation';
import SizeDependencePlot from '../visualizations/SizeDependencePlot';
import PairCorrelationFunctionPlot from '../visualizations/PairCorrelationFunctionPlot';
import ProgramStructure from '../visualizations/ProgramStructure';
import MeltingStages from '../visualizations/MeltingStages';


const StagesSection = forwardRef(({ projectStages }, ref) => {
  const [activeStage, setActiveStage] = useState(1);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const yOffset = -100;
      const element = contentRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [activeStage]);

  return (
    <section
      ref={ref}
      className="py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Этапы проекта</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Комплексный подход к исследованию фазовых переходов в малых кластерах
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <TimelineSlider
              stages={projectStages}
              activeStage={activeStage}
              onChange={setActiveStage}
            />
          </FadeInSection>

          <div ref={contentRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`stage-content-${activeStage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {projectStages[activeStage - 1] ? (
                  <div className="bg-white rounded-xl shadow-xl p-6 mb-16">
                     <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                        {activeStage}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-800">{projectStages[activeStage-1].title}</h3>
                        <p className="text-gray-500">{projectStages[activeStage-1].presenter}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-8">
                      {projectStages[activeStage-1].content}
                    </p>

                    <div className="bg-blue-50 rounded-lg p-4 mb-8">
                      <h4 className="font-bold text-gray-800 mb-2">Задачи этапа:</h4>
                      <ul className="space-y-2">
                        {projectStages[activeStage-1].tasks.map((task, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-8 mb-8">
                      {activeStage === 1 && (
                        <>
                          <HexagonalCluster />
                          <LennardJonesPotential />
                          <MeltingCurve />
                          <BondFluctuation />
                        </>
                      )}

                      {activeStage === 2 && (
                        <>
                          <SizeDependencePlot />
                          <PairCorrelationFunctionPlot />
                        </>
                      )}

                      {activeStage === 3 && (
                        <>
                          <ProgramStructure />
                          <MeltingStages />
                        </>
                      )}
                    </div>

                    {projectStages[activeStage - 1].completed ? (
                      <StageMedia stage={activeStage} stageData={projectStages[activeStage-1]} />
                    ) : (
                      <div className="p-8 bg-gray-50 rounded-lg text-center mt-8">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Содержимое в разработке</h3>
                        <p className="text-gray-600">Материалы для этого этапа появятся после его завершения.</p>
                      </div>
                    )}
                  </div>
                ) : (
                   <div className="text-center py-10 text-gray-500">Выберите этап для просмотра информации.</div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

StagesSection.displayName = 'StagesSection';

export default StagesSection;
