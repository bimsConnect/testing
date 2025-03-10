"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/background1.webp?height=1080&width=1920",
    title: "Solusi Terbaik untuk Bisnis Anda",
    description:
      "Platform SaaS yang membantu Anda mengembangkan bisnis dengan cepat, aman, dan efisien di era digital.",
    highlight: "Bisnis Anda",
  },
  {
    image: "/background2.webp?height=1080&width=1920",
    title: "Tingkatkan Produktivitas Tim",
    description: "Optimalkan kinerja tim Anda dengan fitur kolaborasi dan manajemen proyek yang terintegrasi.",
    highlight: "Produktivitas Tim",
  },
  {
    image: "/background3.webp?height=1080&width=1920",
    title: "Analisis Data yang Mendalam",
    description: "Dapatkan wawasan berharga dari data bisnis Anda untuk pengambilan keputusan yang lebih baik.",
    highlight: "Analisis Data",
  },
]

export default function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          slides.map(async (slide) => {
            const response = await fetch(slide.image, { method: "HEAD" })
            if (!response.ok) throw new Error("Failed to load image")
          }),
        )
        setLoading(false)
      } catch (error) {
        console.error("Failed to preload images:", error)
        setLoading(false)
      }
    }

    preloadImages()

    // Handle scroll visibility
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
        setIsVisible(isVisible)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
            }}
            className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            CMP
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlideIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[currentSlideIndex].image}')` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Content */}
      <div className="container relative z-20 text-white text-center px-4 max-w-5xl mt-16 md:mt-20 py-12 md:py-16">
        {/* Rest of the hero content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
        />

        <AnimatePresence mode="wait">
        <motion.h1
        key={`title-${currentSlideIndex}`}
        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-yellow-400" // Ubah ke kuning
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        >
            {slides[currentSlideIndex].title.split(slides[currentSlideIndex].highlight).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <motion.span
                    className="text-primary relative"
                    animate={{
                      color: ["#1976d2", "#4A00E0", "#1976d2"],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {slides[currentSlideIndex].highlight}
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.span>
                )}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`description-${currentSlideIndex}`}
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white/90 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
          >
            {slides[currentSlideIndex].description}
          </motion.p>
        </AnimatePresence>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
        >
          <Link href="#kontak">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-primary/30"
            >
              <span className="relative z-10 flex items-center">
                Mulai Sekarang
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1 }}
              />
            </Button>
          </Link>
          <Link href="#tentang-kami">
            <Button
                 size="lg"
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-6 text-lg shadow-lg hover:bg-white/20 transition">
            Pelajari Lebih Lanjut
            </Button>
            </Link>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlideIndex ? "bg-primary w-10" : "bg-white/50 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2 font-light">Scroll ke bawah</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-primary rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md z-10"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-purple-500/10 backdrop-blur-md z-10"
        animate={{
          y: [0, 20, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 7,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}

