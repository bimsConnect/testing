"use client"

import { motion } from "framer-motion"
import { Users, Star, BarChart3, Zap } from "lucide-react"

// Stats data
const stats = [
  { icon: Users, value: "500+", label: "Klien Puas" },
  { icon: Star, value: "98%", label: "Tingkat Kepuasan" },
  { icon: BarChart3, value: "10+", label: "Tahun Pengalaman" },
  { icon: Zap, value: "24/7", label: "Dukungan Teknis" },
]

export default function StatsSection() {
  return (
    <div className="relative py-12 bg-gradient-to-r from-primary/5 to-purple-500/5 pt-24 md:pt-28">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

