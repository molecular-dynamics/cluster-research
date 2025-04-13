import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';

const FadeInSection = ({ children, delay = 0, threshold = 0.1, className = "" }) => {
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
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 100, damping: 15 }}
      variants={{
        visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
        hidden: { opacity: 0, y: 50, scale: 0.98, rotate: -1 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
