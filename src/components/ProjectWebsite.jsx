import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import Header from './layout/Header';
import Footer from './layout/Footer';

import HeroSection from './sections/HeroSection';
import TeamSection from './sections/TeamSection';
import StagesSection from './sections/StagesSection';
import ResourcesSection from './sections/ResourcesSection';

import { teamMembers } from './data/teamData';
import { projectStages } from './data/projectStages';

const ProjectWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const homeRef = useRef(null);
  const teamRef = useRef(null);
  const stagesRef = useRef(null);
  const resourcesRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current = [
      { id: 'home', ref: homeRef },
      { id: 'team', ref: teamRef },
      { id: 'stages', ref: stagesRef },
      { id: 'resources', ref: resourcesRef }
    ];

    const options = {
      root: null,
      rootMargin: '-30% 0px -65% 0px',
      threshold: 0
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = sectionsRef.current.find(
            section => section.ref.current === entry.target
          );

          if (section) {
            setActiveSection(section.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sectionsRef.current.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    const timer = setTimeout(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      if (scrollWidth > innerWidth) {
        const scrollX = (scrollWidth - innerWidth) / 2;
        window.scrollTo({ left: scrollX, top: 0, behavior: 'auto' });
      } else {
         window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
      }
    }, 100);


    return () => {
      sectionsRef.current.forEach(section => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (ref, sectionId) => {
    setActiveSection(sectionId);
    if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        homeRef={homeRef}
        teamRef={teamRef}
        stagesRef={stagesRef}
        resourcesRef={resourcesRef}
        scrollProgress={scrollYProgress}
      />

      <HeroSection ref={homeRef} scrollToSection={scrollToSection} stagesRef={stagesRef} resourcesRef={resourcesRef} scrollProgress={scrollYProgress} />

      <TeamSection ref={teamRef} teamMembers={teamMembers} />

      <StagesSection ref={stagesRef} projectStages={projectStages} />

      <ResourcesSection ref={resourcesRef} />

      <Footer />
    </div>
  );
};

export default ProjectWebsite;
