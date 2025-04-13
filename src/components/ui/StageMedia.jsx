import React, { useState } from 'react';

const videoLinksData = {
  1: {
    rutube: "https://rutube.ru/video/private/3db0e9c889eff8640d84acff9c6ad848/?p=RDYyK_Qdny3Yg7mtquLUGQ",
    plvideo: "https://plvideo.ru/watch?v=0WTe_X2PtGda"
  },
  2: {
    rutube: "https://rutube.ru/video/021218f9b68edc108780d27f87656b41/",
    plvideo: "https://plvideo.ru/watch?v=GnU59BViZJzQ"
  },
  3: { rutube: "#", plvideo: "#" },
  4: { rutube: "#", plvideo: "#" }
};

const getPdfPath = (stageNumber) => {
  return `/cluster-research/documents/stage${stageNumber}_presentation.pdf`;
};

const getVideoLinks = (stageNumber) => {
  return videoLinksData[stageNumber] || { rutube: "#", plvideo: "#" };
};


const StageMedia = ({ stage, stageData }) => {
  const [activeTab, setActiveTab] = useState('presentations');
  const presenter = stageData ? stageData.presenter : "";

  const pdfPath = getPdfPath(stage);
  const videoLinks = getVideoLinks(stage);

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
          Презентация
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'videos'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('videos')}
        >
          Видеозапись защиты
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'presentations' ? (
          <div className="bg-white rounded-lg border border-blue-200 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-gray-800 mb-1">Презентация этапа {stage}</h4>
                <p className="text-sm text-gray-600">{presenter}</p>
              </div>
              <div>
                <a
                  href={pdfPath}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium flex items-center"
                  download={`stage${stage}_presentation.pdf`}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Скачать PDF
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-blue-200 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-gray-800 mb-1">Видео защиты этапа {stage}</h4>
                <p className="text-sm text-gray-600">{presenter}</p>
              </div>
              <div className="flex space-x-4">
                <a
                  href={videoLinks.rutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M15 12L10 15V9L15 12Z" fill="currentColor"/>
                  </svg>
                  Смотреть на RuTube
                </a>
                <a
                  href={videoLinks.plvideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M15 12L10 15V9L15 12Z" fill="currentColor"/>
                  </svg>
                  Смотреть на PLVideo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StageMedia;
