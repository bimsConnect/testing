import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">SaaS Company</h3>
            <p className="text-sm text-muted-foreground">
              Solusi terbaik untuk bisnis Anda. Kami membantu Anda tumbuh dan berkembang.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Halaman</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#tentang-kami" className="text-sm text-muted-foreground hover:text-foreground">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-sm text-muted-foreground hover:text-foreground">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimoni" className="text-sm text-muted-foreground hover:text-foreground">
                  Testimoni
                </Link>
              </li>
              <li>
                <Link href="/#kontak" className="text-sm text-muted-foreground hover:text-foreground">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Jl. Contoh No. 123, Jakarta Pusat</li>
              <li className="text-sm text-muted-foreground">info@example.com</li>
              <li className="text-sm text-muted-foreground">+62 123 4567 890</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Ikuti Kami</h3>
            <div className="flex space-x-3">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SaaS Company. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}

