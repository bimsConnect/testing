"use client"

import { motion } from "framer-motion"

export function DecorativeShapes() {
  return (
    <>
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 z-0"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-purple-500/5 z-0"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full border border-primary/20 z-0"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full border border-purple-500/20 z-0"
        animate={{
          y: [0, 30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </>
  )
}

