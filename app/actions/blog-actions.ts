"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { requireAuth } from "@/lib/auth"

export async function getBlogPostsAction() {
  await requireAuth()

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    throw new Error("Failed to fetch blog posts")
  }
}

export async function getPublishedBlogPostsAction() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    })

    return posts
  } catch (error) {
    console.error("Error fetching published blog posts:", error)
    throw new Error("Failed to fetch published blog posts")
  }
}

export async function getBlogPostBySlugAction(slug: string) {
  try {
    // Mock data for development
    if (process.env.NODE_ENV === "development") {
      return {
        id: "1",
        title: "Cara Meningkatkan Produktivitas Bisnis",
        slug: slug,
        excerpt: "Pelajari cara meningkatkan produktivitas bisnis Anda dengan tips dan trik dari para ahli.",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
        image: "/placeholder.svg?height=400&width=800",
        published: true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
    })

    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    throw new Error("Failed to fetch blog post")
  }
}

export async function createBlogPostAction(data: {
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  published: boolean
}) {
  await requireAuth()

  try {
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image || null,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
      },
    })

    revalidatePath("/dashboard/blog")
    revalidatePath("/blog")
    return post
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw new Error("Failed to create blog post")
  }
}

export async function updateBlogPostAction(
  id: string,
  data: {
    title: string
    slug: string
    excerpt: string
    content: string
    image: string
    published: boolean
  },
) {
  await requireAuth()

  try {
    const currentPost = await prisma.blogPost.findUnique({
      where: { id },
    })

    // If post is being published for the first time
    const publishedAt = !currentPost?.published && data.published ? new Date() : currentPost?.publishedAt

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image || null,
        published: data.published,
        publishedAt,
      },
    })

    revalidatePath("/dashboard/blog")
    revalidatePath("/blog")
    revalidatePath(`/blog/${data.slug}`)
    return post
  } catch (error) {
    console.error("Error updating blog post:", error)
    throw new Error("Failed to update blog post")
  }
}

export async function deleteBlogPostAction(id: string) {
  await requireAuth()

  try {
    await prisma.blogPost.delete({
      where: { id },
    })

    revalidatePath("/dashboard/blog")
    revalidatePath("/blog")
    return { success: true }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    throw new Error("Failed to delete blog post")
  }
}

