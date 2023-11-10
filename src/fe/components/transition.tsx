"use client"

import { AnimatePresence, motion } from "framer-motion"

const Transition = () => {
  return (
    <>
      
      <motion.div
        className="fixed top-0 left-0 h-screen bg-[#2e2257] z-[900] w-screen"
        exit={{ width: ['100%', '0%'] }} 
        animate={{ width: '0%' }}
        transition={{ ease: "easeInOut", delay: 0.2, duration: 0.4 }}
      >
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 h-screen bg-[#3b2d71] z-[890] w-screen"
        exit={{ width: ['100%', '0%'] }}  
        animate={{ width: '0%' }}
        transition={{ ease: "easeInOut", delay: 0.4, duration: 0.4 }}
      >
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 h-screen bg-[#4b3792] z-[880] w-screen"
        exit={{ width: ['100%', '0%'] }}  
        animate={{ width: '0%' }}
        transition={{ ease: "easeInOut", delay: 0.6, duration: 0.4 }}
      >
      </motion.div>
    </>
  )
}

export default Transition