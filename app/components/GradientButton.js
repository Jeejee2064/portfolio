
import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ text }) => {
  return (
    <motion.button
      animate={{
        backgroundImage: [
          'linear-gradient(to right, #ffdb40, #FA5D66, #FFA1C5)',
          'linear-gradient(to right, #FFA1C5, #ffdb40, #FA5D66)',
          'linear-gradient(to right, #FA5D66, #FFA1C5, #ffdb40)',
          'linear-gradient(to right, #ffdb40, #FA5D66, #FFA1C5)',
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity
      }}
      className=" px-4 py-4 font-bold border-gray-950 border-4 shadow-lg text-gray-950 rounded-xl z-10"
    >
      {text}
    </motion.button>
  );
};

export default GradientButton;