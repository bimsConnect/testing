"use client"

import { motion } from "framer-motion"
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
}

export default function ContactSection() {
  return (
    <section id="kontak" className="section-padding w-full bg-muted/50 relative">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Kontak Kami</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hubungi kami untuk informasi lebih lanjut atau konsultasi gratis.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={cardVariants}
            className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
            <div className="space-y-4">
              <motion.p
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold mr-2">Alamat:</span> Jl. Contoh No. 123, Jakarta Pusat
              </motion.p>
              <motion.p
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold mr-2">Email:</span> info@example.com
              </motion.p>
              <motion.p
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold mr-2">Telepon:</span> +62 123 4567 890
              </motion.p>
              <motion.p
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold mr-2">Jam Kerja:</span> Senin - Jumat, 09:00 - 17:00
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">Lokasi Kami</h3>
            <motion.div
              className="w-full h-[300px] bg-muted rounded-md flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <p className="text-muted-foreground relative z-10">Peta akan ditampilkan di sini</p>
              <motion.div
                className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-medium">Klik untuk memperbesar</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 bg-background p-8 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Kirim Pesan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
              <motion.input
                type="text"
                className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <motion.input
                type="email"
                className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Subjek</label>
              <motion.input
                type="text"
                className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Pesan</label>
              <motion.textarea
                rows={5}
                className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              ></motion.textarea>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <motion.button
                className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kirim Pesan
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

