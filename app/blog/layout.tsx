import type React from "react"
import { Sidebar } from "@/components/blog/sidebar"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen pt-20 md:pt-24 px-4 md:px-8">{children}</main>
    </div>
  )
}

