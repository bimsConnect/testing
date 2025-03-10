"use client"

import { useEffect, useState } from "react"
import { getPublishedTestimonialsAction } from "@/app/actions/testimonial-actions"
import { TestimonialCard } from "@/components/testimonial-card"

// Definisikan tipe Testimonial secara manual
type Testimonial = {
  id: string
  name: string
  company?: string
  content: string
  image?: string
  rating: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export function TestimonialList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getPublishedTestimonialsAction()
        setTestimonials(data as Testimonial[]) // Pastikan tipe data cocok
      } catch (error) {
        console.error("Error loading testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Belum ada testimoni yang ditampilkan.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          name={testimonial.name}
          company={testimonial.company}
          testimonial={testimonial.content}
          rating={testimonial.rating}
          image={testimonial.image || "/placeholder.svg?height=100&width=100"}
        />
      ))}
    </div>
  )
}
