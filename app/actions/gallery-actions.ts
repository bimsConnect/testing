"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { requireAuth } from "@/lib/auth"

export async function getGalleryItemsAction() {
  await requireAuth()

  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return items
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    throw new Error("Failed to fetch gallery items")
  }
}

export async function getPublishedGalleryItemsAction() {
  try {
    const items = await prisma.galleryItem.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    })

    return items
  } catch (error) {
    console.error("Error fetching published gallery items:", error)
    throw new Error("Failed to fetch published gallery items")
  }
}

export async function createGalleryItemAction(data: {
  title: string
  description: string
  image: string
  published: boolean
}) {
  await requireAuth()

  try {
    const item = await prisma.galleryItem.create({
      data: {
        title: data.title,
        description: data.description || null,
        image: data.image,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
      },
    })

    revalidatePath("/dashboard/galeri")
    revalidatePath("/galeri")
    return item
  } catch (error) {
    console.error("Error creating gallery item:", error)
    throw new Error("Failed to create gallery item")
  }
}

export async function updateGalleryItemAction(
  id: string,
  data: {
    title: string
    description: string
    image: string
    published: boolean
  },
) {
  await requireAuth()

  try {
    const currentItem = await prisma.galleryItem.findUnique({
      where: { id },
    })

    // If item is being published for the first time
    const publishedAt = !currentItem?.published && data.published ? new Date() : currentItem?.publishedAt

    const item = await prisma.galleryItem.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description || null,
        image: data.image,
        published: data.published,
        publishedAt,
      },
    })

    revalidatePath("/dashboard/galeri")
    revalidatePath("/galeri")
    return item
  } catch (error) {
    console.error("Error updating gallery item:", error)
    throw new Error("Failed to update gallery item")
  }
}

export async function deleteGalleryItemAction(id: string) {
  await requireAuth()

  try {
    await prisma.galleryItem.delete({
      where: { id },
    })

    revalidatePath("/dashboard/galeri")
    revalidatePath("/galeri")
    return { success: true }
  } catch (error) {
    console.error("Error deleting gallery item:", error)
    throw new Error("Failed to delete gallery item")
  }
}

