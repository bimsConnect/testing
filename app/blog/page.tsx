import type { Metadata } from "next"
import { getPublishedBlogPostsAction } from "@/app/actions/blog-actions"
import { BlogCard } from "@/components/blog-card"

// Tambahkan interface untuk tipe BlogPost
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string | null
  published: boolean
  publishedAt: Date | null
  createdAt?: Date
  updatedAt?: Date
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Artikel terbaru dan wawasan dari tim kami",
}

export default async function BlogPage({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // Await the searchParams if needed
  await searchParams

  // For development, create mock data
  let posts

  if (process.env.NODE_ENV === "development") {
    posts = [
      {
        id: "1",
        title: "Cara Meningkatkan Produktivitas Bisnis",
        slug: "cara-meningkatkan-produktivitas-bisnis",
        excerpt: "Pelajari cara meningkatkan produktivitas bisnis Anda dengan tips dan trik dari para ahli.",
        image: "/placeholder.svg?height=200&width=400",
        published: true,
        publishedAt: new Date(),
      },
      {
        id: "2",
        title: "Strategi Marketing Digital 2023",
        slug: "strategi-marketing-digital-2023",
        excerpt: "Temukan strategi marketing digital terbaru yang efektif untuk bisnis Anda di tahun 2023.",
        image: "/placeholder.svg?height=200&width=400",
        published: true,
        publishedAt: new Date(),
      },
      {
        id: "3",
        title: "Pentingnya Analisis Data untuk Bisnis",
        slug: "pentingnya-analisis-data-untuk-bisnis",
        excerpt: "Mengapa analisis data sangat penting untuk pertumbuhan dan pengembangan bisnis Anda.",
        image: "/placeholder.svg?height=200&width=400",
        published: true,
        publishedAt: new Date(),
      },
    ]
  } else {
    posts = await getPublishedBlogPostsAction()
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Artikel terbaru dan wawasan dari tim kami.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: BlogPost) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("id-ID") : ""}
              slug={post.slug}
              image={post.image || "/placeholder.svg?height=200&width=400"}
            />
          ))}
        </div>
      )}
    </div>
  )
}

