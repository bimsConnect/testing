"use client"

import { Star, StarHalf } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface TestimonialCardProps {
  name: string
  company?: string
  testimonial: string
  rating: number
  image: string
}

export function TestimonialCard({ name, company, testimonial, rating, image }: TestimonialCardProps) {
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <motion.div key={`star-${i}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.3 }}>
          <Star className="h-4 w-4 fill-primary text-primary" />
        </motion.div>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <motion.div key="half-star" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: fullStars * 0.1, duration: 0.3 }}>
          <StarHalf className="h-4 w-4 text-primary" />
        </motion.div>
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <motion.div key={`empty-star-${i}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.1, duration: 0.3 }}>
          <Star className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      )
    }

    return stars
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.1 }}>
              <Image src={image || "/placeholder.svg"} alt={name} width={50} height={50} className="rounded-full object-cover" />
            </motion.div>
            <div>
              <motion.h4 className="font-semibold" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                {name}
              </motion.h4>
              {company && (
                <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                  {company}
                </motion.p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.p className="text-sm mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            {testimonial}
          </motion.p>
          <motion.div className="flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
            {renderStars()}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function TestimonialList({ testimonials }: { testimonials: TestimonialCardProps[] }) {
  const [displayedTestimonials, setDisplayedTestimonials] = useState([...testimonials, ...testimonials])

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedTestimonials((prev) => [...prev.slice(1), prev[0]])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden h-[400px] relative">
      <motion.div
        className="flex flex-col space-y-6"
        animate={{ y: [0, -100 * testimonials.length] }}
        transition={{ repeat: Infinity, duration: testimonials.length * 3, ease: "linear" }}
      >
        {displayedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </motion.div>
    </div>
  )
}
