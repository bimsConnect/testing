"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TestimonialCard } from "@/components/testimonial-card"
import { DecorativeShapes } from "@/components/ui/decorative-shapes"

// Animasi untuk fade-in
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Animasi untuk staggered children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Animasi untuk card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
}

export default function TestimonialSection() {
  return (
    <section id="testimoni" className="section-padding w-full relative">
      <DecorativeShapes />
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Testimoni</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Apa kata klien kami tentang layanan yang kami berikan.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={cardVariants} whileHover="hover">
            <TestimonialCard
              name="Budi Santoso"
              company="PT Maju Jaya"
              testimonial="Layanan yang sangat memuaskan. Tim sangat profesional dan responsif terhadap kebutuhan kami."
              rating={5}
              image="/placeholder.svg?height=100&width=100"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <TestimonialCard
              name="Siti Rahayu"
              company="CV Berkah Abadi"
              testimonial="Kami sangat puas dengan hasil kerja tim. Mereka memahami kebutuhan bisnis kami dengan baik."
              rating={4}
              image="/placeholder.svg?height=100&width=100"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <TestimonialCard
              name="Dian Permata"
              company="PT Sukses Mandiri"
              testimonial="Solusi yang diberikan sangat membantu meningkatkan efisiensi operasional perusahaan kami."
              rating={5}
              image="/placeholder.svg?height=100&width=100"
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/testimoni">
            <Button variant="outline" className="mr-4">
              Lihat Semua Testimoni
            </Button>
          </Link>
          <Link href="/testimoni/tambah">
            <Button className="relative overflow-hidden group">
              <span className="relative z-10">Tambah Testimoni</span>
              <span className="absolute inset-0 bg-primary-foreground/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

