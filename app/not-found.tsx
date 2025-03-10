import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Halaman Tidak Ditemukan</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan, dihapus, atau tidak
        pernah ada.
      </p>
      <Link href="/">
        <Button size="lg">Kembali ke Beranda</Button>
      </Link>
    </div>
  )
}

