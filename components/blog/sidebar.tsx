"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Tag, Calendar, BookOpen, TrendingUp, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Categories
  const categories = [
    { name: "Teknologi", count: 12 },
    { name: "Bisnis", count: 8 },
    { name: "Marketing", count: 6 },
    { name: "Pengembangan", count: 5 },
    { name: "Desain", count: 4 },
  ]

  // Recent posts
  const recentPosts = [
    { title: "Cara Meningkatkan Produktivitas Bisnis", slug: "cara-meningkatkan-produktivitas-bisnis" },
    { title: "Strategi Marketing Digital 2023", slug: "strategi-marketing-digital-2023" },
    { title: "Pentingnya Analisis Data untuk Bisnis", slug: "pentingnya-analisis-data-untuk-bisnis" },
  ]

  // Tags
  const tags = ["SaaS", "Business", "Marketing", "Technology", "Design", "Development", "Analytics", "Strategy"]

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <motion.button
          className="fixed top-24 left-4 z-40 bg-primary text-white p-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <X size={20} /> : <ChevronRight size={20} />}
        </motion.button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          className={`bg-background border-r w-full md:w-72 lg:w-80 fixed md:sticky top-0 md:top-20 h-screen z-30 overflow-y-auto pb-20 ${isMobile ? "shadow-xl" : ""}`}
          initial={isMobile ? "closed" : "open"}
          animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
          variants={sidebarVariants}
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <div className="p-6 space-y-8">
            {/* Search */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Search size={18} className="text-primary" /> Cari Artikel
              </h3>
              <div className="relative">
                <Input placeholder="Cari..." className="w-full pl-10" />
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Tag size={18} className="text-primary" /> Kategori
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <motion.li key={category.name} variants={itemVariants} whileHover={{ x: 5 }}>
                    <Link
                      href={`/blog/category/${category.name.toLowerCase()}`}
                      className="flex justify-between items-center text-sm hover:text-primary transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{category.count}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Recent Posts */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Calendar size={18} className="text-primary" /> Artikel Terbaru
              </h3>
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <motion.li key={post.slug} variants={itemVariants} whileHover={{ x: 5 }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <BookOpen size={18} className="text-primary" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <motion.div key={tag} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <Link
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="inline-block bg-muted px-3 py-1 rounded-full text-xs hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Popular Posts */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" /> Artikel Populer
              </h3>
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <motion.li key={`popular-${post.slug}`} variants={itemVariants} whileHover={{ x: 5 }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="space-y-3 bg-muted p-4 rounded-lg">
              <h3 className="font-medium">Berlangganan Newsletter</h3>
              <p className="text-sm text-muted-foreground">Dapatkan update artikel terbaru langsung ke email Anda</p>
              <div className="space-y-2">
                <Input placeholder="Email Anda" className="w-full" />
                <Button className="w-full">Berlangganan</Button>
              </div>
            </motion.div>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  )
}

