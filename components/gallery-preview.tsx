"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Animasi untuk container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Animasi untuk item galeri
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function GalleryPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Sample gallery items
  const galleryItems = [
    { id: 1, title: "Project 1", image: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "Project 2", image: "/placeholder.svg?height=300&width=400" },
    { id: 3, title: "Project 3", image: "/placeholder.svg?height=300&width=400" },
    { id: 4, title: "Project 4", image: "/placeholder.svg?height=300&width=400" },
    { id: 5, title: "Project 5", image: "/placeholder.svg?height=300&width=400" },
    { id: 6, title: "Project 6", image: "/placeholder.svg?height=300&width=400" },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {galleryItems.slice(0, 6).map((item) => (
        <motion.div
          key={item.id}
          className="relative group overflow-hidden rounded-lg"
          variants={itemVariants}
          onHoverStart={() => setHoveredId(item.id)}
          onHoverEnd={() => setHoveredId(null)}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={400}
            height={300}
            className="w-full h-auto object-cover transition-transform duration-300"
          />
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-white font-medium text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: hoveredId === item.id ? 0 : 20,
                opacity: hoveredId === item.id ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {item.title}
            </motion.h3>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

