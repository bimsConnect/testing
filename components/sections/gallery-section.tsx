"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GalleryPreview } from "@/components/gallery-preview"
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

export default function GallerySection() {
  return (
    <section id="galeri" className="section-padding w-full relative">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeri</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Lihat beberapa hasil karya dan proyek terbaik kami.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mt-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <GalleryPreview />
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/galeri">
              <Button variant="outline" className="group">
                Lihat Semua Galeri
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
        </motion.div>
      </div>
    </section>
  )
}

