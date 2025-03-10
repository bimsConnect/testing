import type { Metadata } from "next"
import Image from "next/image"
import { getPublishedGalleryItemsAction } from "@/app/actions/gallery-actions"

// Tambahkan interface untuk tipe GalleryItem
interface GalleryItem {
  id: string
  title: string
  description: string | null
  image: string
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export const metadata: Metadata = {
  title: "Galeri",
  description: "Lihat beberapa hasil karya dan proyek terbaik kami",
}

export default async function GaleriPage({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // Await the searchParams if needed
  await searchParams

  const galleryItems = await getPublishedGalleryItemsAction()

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeri</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Lihat beberapa hasil karya dan proyek terbaik kami.
          </p>
        </div>
      </div>

      {galleryItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Belum ada item galeri yang dipublikasikan.</p>
        </div>
      ) : (
        // Ubah bagian map untuk menambahkan tipe eksplisit
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item: GalleryItem) => (
            <div key={item.id} className="relative group overflow-hidden rounded-lg">
              <Image
                src={item.image || "/placeholder.svg?height=300&width=400"}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-white font-medium text-lg">{item.title}</h3>
                  {item.description && <p className="text-white/80 text-sm mt-2">{item.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

