"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { requireAuth } from "@/lib/auth"

export async function getTestimonialsAction() {
  await requireAuth()

  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return testimonials
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    throw new Error("Failed to fetch testimonials")
  }
}

export async function getPublishedTestimonialsAction() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "approved",
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return testimonials
  } catch (error) {
    console.error("Error fetching published testimonials:", error)
    throw new Error("Failed to fetch published testimonials")
  }
}

export async function createTestimonialAction(
  name: string,
  company: string | null,
  content: string,
  rating: number,
  image: string | null,
) {
  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        company,
        content,
        rating,
        image,
        status: "pending",
      },
    })

    revalidatePath("/testimoni")
    return testimonial
  } catch (error) {
    console.error("Error creating testimonial:", error)
    throw new Error("Failed to create testimonial")
  }
}

export async function updateTestimonialStatusAction(id: string, status: "pending" | "approved" | "rejected") {
  await requireAuth()

  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { status },
    })

    revalidatePath("/dashboard/testimoni")
    revalidatePath("/testimoni")
    return testimonial
  } catch (error) {
    console.error("Error updating testimonial status:", error)
    throw new Error("Failed to update testimonial status")
  }
}

export async function deleteTestimonialAction(id: string) {
  await requireAuth()

  try {
    await prisma.testimonial.delete({
      where: { id },
    })

    revalidatePath("/dashboard/testimoni")
    revalidatePath("/testimoni")
    return { success: true }
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    throw new Error("Failed to delete testimonial")
  }
}

