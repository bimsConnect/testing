"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Star } from "lucide-react"
import { createTestimonialAction } from "@/app/actions/testimonial-actions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Ubah definisi parameter searchParams menjadi Promise
export default function TambahTestimoniPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [testimonial, setTestimonial] = useState("")
  const [rating, setRating] = useState(5)
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Tambahkan useEffect untuk menangani searchParams yang sekarang berupa Promise
  useEffect(() => {
    const handleSearchParams = async () => {
      try {
        // Await searchParams jika diperlukan
        const params = await searchParams
        // Lakukan sesuatu dengan params jika diperlukan
      } catch (error) {
        console.error("Error processing search params:", error)
      }
    }

    handleSearchParams()
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real application, you would upload the image to a storage service
      // and get back a URL to store in the database
      let imageUrl = null

      // For now, we'll just mock this part
      if (image) {
        // This would be replaced with actual image upload logic
        imageUrl = `/uploads/testimonials/${image.name}`
      }

      await createTestimonialAction(name, company || null, testimonial, rating, imageUrl)

      setSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        router.push("/testimoni")
        router.refresh()
      }, 2000)
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      setError("Terjadi kesalahan saat mengirim testimoni. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Testimoni</CardTitle>
          <CardDescription>
            Bagikan pengalaman Anda dengan kami. Testimoni Anda akan ditampilkan setelah dimoderasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="bg-green-50 p-4 rounded-md text-green-800 text-center">
              <p className="font-medium">Terima kasih atas testimoni Anda!</p>
              <p className="text-sm mt-1">Testimoni Anda akan ditampilkan setelah dimoderasi oleh admin.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 text-sm text-white bg-destructive rounded-md">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Perusahaan (Opsional)</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial">Testimoni</Label>
                <Textarea
                  id="testimonial"
                  rows={4}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} type="button" onClick={() => setRating(value)} className="focus:outline-none">
                      <Star
                        className={`h-6 w-6 ${value <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Foto Profil (Opsional)</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                <p className="text-xs text-muted-foreground">Format yang didukung: JPG, PNG. Ukuran maksimum: 2MB.</p>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim Testimoni"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/testimoni">
            <Button variant="outline">Kembali</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

