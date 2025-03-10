"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedBackground } from "@/components/animated-background"
import HeroSection from "@/components/sections/hero-section"
import StatsSection from "@/components/sections/stats-section"
import AboutSection from "@/components/sections/about-section"
import GallerySection from "@/components/sections/gallery-section"
import BlogSection from "@/components/sections/blog-section"
import TestimonialSection from "@/components/sections/testimonial-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!isLoaded ? (
        <motion.div
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
            }}
            className="relative"
          >
            <div className="h-16 w-16 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              CMP
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Background */}
          <AnimatedBackground />

          {/* Hero Section with Slideshow */}
          <HeroSection />

          {/* Stats Section */}
          <StatsSection />

          {/* Tentang Kami Section */}
          <AboutSection />

          {/* Galeri Preview Section */}
          <GallerySection />

          {/* Blog Preview Section */}
          <BlogSection />

          {/* Testimonial Section */}
          <TestimonialSection />

          {/* Contact Section */}
          <ContactSection />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

