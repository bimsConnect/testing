"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Terjadi Kesalahan</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Maaf, terjadi kesalahan saat memuat halaman ini. Tim kami telah diberitahu tentang masalah ini.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} variant="default" size="lg">
          Coba Lagi
        </Button>
        <Link href="/">
          <Button variant="outline" size="lg">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  )
}

