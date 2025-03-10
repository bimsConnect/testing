"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Transform values for smooth animations
  const navBackground = useTransform(
    scrollY,
    [0, 50, 100],
    ["rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.95)"],
  )

  const navShadow = useTransform(
    scrollY,
    [0, 50, 100],
    ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 20px rgba(0, 0, 0, 0.05)", "0 4px 20px rgba(0, 0, 0, 0.1)"],
  )

  const navPadding = useTransform(scrollY, [0, 100], ["1.25rem", "0.75rem"])

  const textColor = useTransform(scrollY, [0, 50], ["rgb(255, 255, 255)", "rgb(15, 23, 42)"])

  const logoColor = useTransform(scrollY, [0, 50], ["rgb(255, 255, 255)", "hsl(var(--primary))"])

  // Update scrolled state for conditional rendering
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 50)
    })

    return () => unsubscribe()
  }, [scrollY])

  // Handle mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "#tentang-kami" },
    { name: "Galeri", href: "#galeri" },
    { name: "Blog", href: "#blog" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "Kontak", href: "#kontak" },
  ]

  return (
    <>
      <motion.div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-sm"
        style={{
          backgroundColor: navBackground,
          boxShadow: navShadow,
          paddingTop: navPadding,
          paddingBottom: navPadding,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <motion.span className="text-2xl font-bold" style={{ color: logoColor }} transition={{ duration: 0.3 }}>
              Cipta Mandiri Perkasa
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.span
                  className="text-sm font-medium relative py-2 px-1"
                  style={{ color: textColor }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transform origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}
            <Link href="/login">
            <Button
             variant="outline"
                size="sm"
            className={
            scrolled
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-transparent border-white text-white hover:bg-white/10"
            }
            >
            Login
            </Button>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <motion.button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full"
            style={{ color: textColor }}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{ paddingTop: navRef.current?.offsetHeight }}
          >
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.05 * index,
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary text-2xl font-medium block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                  <motion.div
                    className="h-px bg-muted w-full mt-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * index,
                    }}
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.05 * navLinks.length,
                  },
                }}
                className="pt-4"
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full py-6 text-lg">Login</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

