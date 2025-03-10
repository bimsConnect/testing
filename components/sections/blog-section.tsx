"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
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

export default function BlogSection() {
  return (
    <section id="blog" className="section-padding w-full bg-muted/50 relative">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Artikel terbaru dan wawasan dari tim kami.
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
            <BlogCard
              title="Cara Meningkatkan Produktivitas Bisnis"
              excerpt="Pelajari cara meningkatkan produktivitas bisnis Anda dengan tips dan trik dari para ahli."
              date="12 Mei 2023"
              slug="cara-meningkatkan-produktivitas-bisnis"
              image="/placeholder.svg?height=200&width=400"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <BlogCard
              title="Strategi Marketing Digital 2023"
              excerpt="Temukan strategi marketing digital terbaru yang efektif untuk bisnis Anda di tahun 2023."
              date="5 Juni 2023"
              slug="strategi-marketing-digital-2023"
              image="/placeholder.svg?height=200&width=400"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <BlogCard
              title="Pentingnya Analisis Data untuk Bisnis"
              excerpt="Mengapa analisis data sangat penting untuk pertumbuhan dan pengembangan bisnis Anda."
              date="20 Juli 2023"
              slug="pentingnya-analisis-data-untuk-bisnis"
              image="/placeholder.svg?height=200&width=400"
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
          <Link href="/blog">
            <Button variant="outline" className="group">
              Lihat Semua Artikel
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
              >
                →
              </motion.span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

