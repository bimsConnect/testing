import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { getBlogPostBySlugAction } from "@/app/actions/blog-actions"
import { Button } from "@/components/ui/button"

// Tambahkan interface untuk tipe BlogPost
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlugAction(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlugAction(slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <div className="container py-12">
      <Link href="/blog">
        <Button variant="ghost" className="mb-6 pl-0 hover:pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Blog
        </Button>
      </Link>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">{post.title}</h1>

        <div className="text-sm text-muted-foreground mb-6">
          {post.publishedAt && (
            <time dateTime={new Date(post.publishedAt).toISOString()}>
              {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
        </div>

        {post.image && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Ubah bagian map untuk menambahkan tipe eksplisit */}
        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

