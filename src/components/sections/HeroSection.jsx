import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import FadeInSection from '../ui/FadeInSection';

const HeroSection = forwardRef(({ scrollToSection, stagesRef, resourcesRef, scrollProgress }, ref) => {
  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-50 blur-3xl opacity-60"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 -right-24 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-60"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-purple-50 blur-3xl opacity-40"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-20 h-20">
        <div className="atom-orbit" style={{width: "80px", height: "80px"}}></div>
        <div className="atom-orbit" style={{width: "120px", height: "120px", transform: "rotate(60deg)"}}></div>
        <div className="atom-orbit" style={{width: "160px", height: "160px", transform: "rotate(120deg)"}}></div>
        <div className="atom-particle" style={{top: "40px", left: "40px"}}></div>
        <div className="atom-particle" style={{top: "60px", left: "60px", animationDelay: "1s"}}></div>
        <div className="atom-particle" style={{top: "80px", left: "80px", animationDelay: "2s"}}></div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20">
        <div className="atom-orbit" style={{width: "100px", height: "100px"}}></div>
        <div className="atom-orbit" style={{width: "140px", height: "140px", transform: "rotate(30deg)"}}></div>
        <div className="atom-particle" style={{top: "50px", left: "50px", animationDelay: "0.5s"}}></div>
        <div className="atom-particle" style={{top: "70px", left: "70px", animationDelay: "1.5s"}}></div>
      </div>
    
      <div className="container mx-auto px-4 py-24 z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-4 px-3 py-1 bg-blue-100 rounded-full text-blue-800 text-sm font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Групповой научный проект
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              y: { delay: 0.3, duration: 0.8 },
              backgroundPosition: {
                repeat: Infinity,
                duration: 8,
                ease: "linear"
              }
            }}
          >
            Исследование плавления и затвердевания малых кластеров
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Изучение фазовых переходов в кластерах с "магическими" числами частиц методами молекулярной динамики
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.button 
              onClick={() => scrollToSection(stagesRef, 'stages')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 4px 6px rgba(59, 130, 246, 0.1)",
                  "0 8px 15px rgba(59, 130, 246, 0.3)",
                  "0 4px 6px rgba(59, 130, 246, 0.1)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2
              }}
            >
              Изучить проект
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection(resourcesRef, 'resources')}
              className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg shadow-lg hover:bg-blue-50 transition-colors font-medium"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Исходный код
            </motion.button>
          </motion.div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
          <FadeInSection delay={0.1}>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform border border-gray-100 relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-50 rounded-full opacity-40"></div>
              <div className="absolute right-8 bottom-8 w-6 h-6 bg-blue-200 rounded-full opacity-60 floating"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-blue-100 rounded-xl mb-4 flex items-center justify-center text-blue-600">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.48998 5.03995L11 2L12.51 5.04005C12.643 5.30221 12.8447 5.52392 13.0924 5.67535C13.34 5.82677 13.6239 5.90134 13.913 5.89C14.183 5.89 15.217 5.67 16.45 8.5C17.739 11.4471 19.849 12.303 19.87 12.31C19.9916 12.3724 20.1213 12.4129 20.2555 12.4295C20.3897 12.4461 20.5262 12.4384 20.6568 12.407C20.7875 12.3755 20.9099 12.3209 21.0178 12.2461C21.1256 12.1713 21.2172 12.0775 21.288 11.97L22 10.7V13.485L21.915 13.575C21.8446 13.6452 21.7605 13.7006 21.6677 13.7377C21.575 13.7749 21.4756 13.7932 21.376 13.792C21.266 13.792 18.045 13.792 16.196 9.33795C14.849 6.08995 14.265 7.46995 13.913 7.46005H10.087C9.7351 7.46026 9.38728 7.35355 9.09226 7.15432C8.79723 6.95508 8.56964 6.67291 8.44 6.34295L7 3.33295V6.31695L7.713 7.58995C7.78328 7.69728 7.8752 7.79111 7.98353 7.86593C8.09187 7.94075 8.21444 7.99513 8.34519 8.0266C8.47593 8.05807 8.61247 8.06599 8.74656 8.04994C8.88064 8.03389 9.01024 7.99421 9.12604 7.93295C9.13604 7.92795 11.282 6.85895 12.559 9.81695C13.819 12.7259 14.853 12.506 15.123 12.506C15.4121 12.4946 15.6959 12.5692 15.9436 12.7206C16.1912 12.872 16.3929 13.0937 16.526 13.356L18 16.367V13.386L16.557 10.413C16.4274 10.0828 16.3999 9.72534 16.4775 9.3806C16.555 9.03586 16.7352 8.72159 16.996 8.47895C17.2568 8.23631 17.5874 8.07499 17.9413 8.01634C18.2951 7.95769 18.6587 8.00461 18.986 8.15005C19.006 8.15805 20.08 8.71005 19.017 5.82005C18.042 3.18005 16.92 3.02005 16.666 3.00005H12.684C12.3319 2.99994 11.9841 2.89345 11.689 2.6946C11.3939 2.49574 11.1662 2.21408 11.037 1.88495L9.48998 5.03995ZM2 11.702L3.49 14.67C3.61938 14.9991 3.64715 15.3555 3.57002 15.6993C3.49289 16.0431 3.31351 16.3566 3.05386 16.5988C2.79422 16.841 2.46494 17.0023 2.11227 17.0616C1.7596 17.1209 1.39705 17.0751 1.07 16.9311C1.05 16.9221 0 16.3811 1.017 19.1921C1.992 21.8121 3.114 21.9721 3.368 21.9921H7.316C7.66813 21.9922 8.01587 22.0986 8.31103 22.2975C8.60618 22.4963 8.83382 22.778 8.963 23.1071L10.51 20.9631L9 18.0001C8.86695 17.738 8.66528 17.5162 8.41761 17.3648C8.16994 17.2134 7.8861 17.1388 7.597 17.1501C7.327 17.1501 6.293 17.3701 5.06 14.5401C3.771 11.5931 1.661 10.7371 1.64 10.7301C1.51835 10.6677 1.3887 10.6271 1.25448 10.6105C1.12026 10.5939 0.983779 10.6016 0.853166 10.633C0.722554 10.6645 0.600104 10.7191 0.492264 10.7939C0.384424 10.8686 0.292814 10.9624 0.222 11.0701L0 12.3431V9.56205L0.13 9.39005C0.200411 9.3199 0.28452 9.26447 0.377279 9.22736C0.470038 9.19025 0.569459 9.1719 0.67 9.17205C0.78 9.17205 4 9.17205 5.85 13.6251C7.196 16.8731 7.78 15.4931 8.132 15.5031H11.96C12.3108 15.5027 12.6577 15.6091 12.9518 15.8078C13.246 16.0064 13.473 16.2879 13.602 16.6171L15 19.6001V16.6171L14.252 15.4001C14.1817 15.2928 14.0898 15.199 13.9815 15.1241C13.8732 15.0493 13.7506 14.9947 13.62 14.9631C13.4894 14.9316 13.3529 14.9239 13.2187 14.9405C13.0845 14.9571 12.9548 14.9976 12.833 15.0601C12.823 15.0651 10.7 16.1231 9.47 13.1831C8.213 10.2781 7.18 10.4981 6.91 10.4981C6.62186 10.5094 6.33802 10.4348 6.09035 10.2834C5.84268 10.132 5.64101 9.91026 5.508 9.64814L4 6.64014V9.62214L5.48 12.5721C5.60975 12.902 5.63756 13.2642 5.56046 13.6086C5.48336 13.953 5.30428 14.2671 5.04495 14.5097C4.78563 14.7523 4.45673 14.9138 4.10442 14.9728C3.75211 15.0318 3.3899 14.9854 3.063 14.8411C3.043 14.8341 1.969 14.2811 3.033 17.1721C4.008 19.8121 5.13 19.9721 5.384 19.9921H9.367C9.71886 19.9921 10.0664 20.0984 10.3613 20.2971C10.6563 20.4963 10.8839 20.7773 11.013 21.1061L12.52 18.0001L11 15.0001C10.868 14.738 10.6664 14.5161 10.4189 14.3645C10.1714 14.213 9.88783 14.1382 9.599 14.1491C9.329 14.1491 8.295 14.3691 7.062 11.5391C5.773 8.59205 3.663 7.73605 3.642 7.72905C3.38975 7.60413 3.10493 7.56163 2.82596 7.60807C2.54699 7.65452 2.28848 7.78791 2.081 7.99005L2 8.07305V11.702Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Фазовые переходы</h3>
                <p className="text-gray-600">Изучение уникальных особенностей плавления и затвердевания наноразмерных систем</p>
              </div>
            </motion.div>
          </FadeInSection>
          
          <FadeInSection delay={0.3}>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform border border-gray-100 relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
            >
              <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-purple-50 rounded-full opacity-40"></div>
              <div className="absolute left-12 bottom-10 w-4 h-4 bg-purple-200 rounded-full opacity-60 floating" style={{animationDelay: "1s"}}></div>
              
              <div className="relative">
                <motion.div 
                  className="w-14 h-14 bg-purple-100 rounded-xl mb-4 flex items-center justify-center text-purple-600"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-2">"Магические" числа</h3>
                <p className="text-gray-600">Исследование кластеров с особой стабильностью при числах частиц 7, 19, 37, 61</p>
              </div>
            </motion.div>
          </FadeInSection>
          
          <FadeInSection delay={0.5}>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform border border-gray-100 relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                  delay: 2
                }
              }}
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-40"></div>
              <div className="absolute right-10 top-8 w-5 h-5 bg-indigo-200 rounded-full opacity-60 floating" style={{animationDelay: "1.5s"}}></div>
              
              <div className="relative">
                <motion.div 
                  className="w-14 h-14 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center text-indigo-600"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotateZ: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3.5,
                    repeatType: "mirror"
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3282 7.67842C21.7181 11.0683 21.7181 16.5487 18.3282 19.9387C14.9383 23.3286 9.45792 23.3286 6.06799 19.9387C2.67806 16.5487 2.67806 11.0683 6.06799 7.67842C9.45792 4.28848 14.9383 4.28848 18.3282 7.67842" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.3282 4.06152C14.9383 0.671583 9.45792 0.671582 6.06799 4.06152C2.67806 7.45145 2.67806 12.9318 6.06799 16.3218C9.45792 19.7117 14.9383 19.7117 18.3282 16.3218C21.7181 12.9318 21.7181 7.45146 18.3282 4.06152" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12.198" cy="12.1982" r="2.4" transform="rotate(45 12.198 12.1982)" fill="currentColor"/>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Молекулярная динамика</h3>
                <p className="text-gray-600">Применение численных методов для моделирования поведения многочастичных систем</p>
              </div>
            </motion.div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
