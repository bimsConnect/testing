import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TestimonialList } from "@/components/testimonial-list"

export const metadata: Metadata = {
  title: "Testimoni",
  description: "Testimoni dari pelanggan kami",
}

export default function TestimoniPage({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Testimoni</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Apa kata klien kami tentang layanan yang kami berikan.
          </p>
        </div>
      </div>

      <TestimonialList />

      <div className="flex justify-center mt-12">
        <Link href="/testimoni/tambah">
          <Button size="lg">Tambah Testimoni</Button>
        </Link>
      </div>
    </div>
  )
}

