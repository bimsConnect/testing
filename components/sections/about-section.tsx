"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
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

// Animasi untuk feature item
const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

export default function AboutSection() {
  return (
    <section id="tentang-kami" className="section-padding w-full bg-muted/50 relative">
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
            <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" variants={fadeInUp}>
              Tentang Kami
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              variants={fadeInUp}
            >
              Kami adalah tim profesional yang berdedikasi untuk memberikan solusi terbaik bagi bisnis Anda. Dengan
              pengalaman lebih dari 10 tahun, kami telah membantu ratusan perusahaan mencapai tujuan mereka.
            </motion.p>
          </div>
        </motion.div>

        <div className="mt-16">
          <motion.h3
            className="text-2xl font-bold tracking-tighter text-center mb-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            Mengapa Memilih Kami
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              variants={featureVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-3 bg-primary/10 rounded-full mb-4"
              >
                <CheckCircle className="h-8 w-8 text-primary" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-2">Kualitas Terjamin</h4>
              <p className="text-muted-foreground">Kami menjamin kualitas layanan terbaik untuk setiap klien.</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              variants={featureVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-3 bg-primary/10 rounded-full mb-4"
              >
                <CheckCircle className="h-8 w-8 text-primary" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-2">Harga Kompetitif</h4>
              <p className="text-muted-foreground">Harga yang bersaing dengan kualitas yang tidak mengecewakan.</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              variants={featureVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-3 bg-primary/10 rounded-full mb-4"
              >
                <CheckCircle className="h-8 w-8 text-primary" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-2">Dukungan 24/7</h4>
              <p className="text-muted-foreground">Tim dukungan kami siap membantu Anda kapan saja.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

