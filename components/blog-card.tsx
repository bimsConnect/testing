"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
  image: string
}

export function BlogCard({ title, excerpt, date, slug, image }: BlogCardProps) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
      <CardHeader className="p-4">
        <motion.h3
          className="text-xl font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <motion.p
          className="text-sm text-muted-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {excerpt}
        </motion.p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <motion.p
          className="text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {date}
        </motion.p>
        <Link href={`/blog/${slug}`} className="group">
          <motion.span
            className="text-sm font-medium text-primary hover:underline inline-flex items-center"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            Baca Selengkapnya
            <motion.span
              className="inline-block ml-1"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
            >
              →
            </motion.span>
          </motion.span>
        </Link>
      </CardFooter>
    </Card>
  )
}

