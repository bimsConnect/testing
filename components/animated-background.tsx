"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  className?: string
}

export function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return // Cegah error jika canvas tidak ada

    const ctx = canvas.getContext("2d")
    if (!ctx) return // Cegah error jika context tidak bisa dibuat

    // Set ukuran canvas
    const setCanvasDimensions = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Fungsi untuk membuat warna acak
    const getRandomColor = () => {
      const hue = Math.random() * 60 + 200 // Warna dalam range biru
      const lightness = Math.random() * 30 + 40
      return `hsl(${hue}, 70%, ${lightness}%)`
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      flickerSpeed: number

      constructor() {
        const c = canvasRef.current as HTMLCanvasElement // Type assertion
        this.x = Math.random() * c.width
        this.y = Math.random() * c.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = getRandomColor()
        this.flickerSpeed = Math.random() * 0.02 + 0.005
      }

      update() {
        const c = canvasRef.current
        if (!c) return

        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > c.width) this.speedX *= -1
        if (this.y < 0 || this.y > c.height) this.speedY *= -1

        const currentHue = parseFloat(this.color.match(/\d+/)?.[0] || "220")
        const newHue = (currentHue + this.flickerSpeed * 100) % 360
        this.color = `hsl(${newHue}, 70%, 50%)`
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particleCount = Math.min(Math.floor(canvas.width / 10), 100)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      ctx.strokeStyle = "rgba(100, 150, 255, 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className={`fixed inset-0 -z-10 opacity-30 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  )
}
