"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { requireAuth } from "@/lib/auth"
import bcrypt from "bcryptjs"

interface GeneralSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  enableComments: boolean
  enableTestimonials: boolean
}

export async function updateSettingsAction(settings: GeneralSettings) {
  await requireAuth()

  try {
    // In a real application, you would save these settings to the database
    // For now, we'll just mock a successful response
    console.log("Settings updated:", settings)

    // Revalidate relevant paths
    revalidatePath("/dashboard/pengaturan")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error updating settings:", error)
    throw new Error("Failed to update settings")
  }
}

export async function updatePasswordAction(currentPassword: string, newPassword: string) {
  const user = await requireAuth()

  try {
    // Get the user from the database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, dbUser.password)

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect")
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    throw new Error("Failed to update password")
  }
}

