import type { ReactNode } from "react"
import { requireAuth } from "@/lib/auth"
import { DashboardProvider } from "@/components/dashboard/dashboard-provider"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export const metadata = {
  title: "Dashboard Admin",
  description: "Dashboard admin untuk mengelola konten website",
}

export default async function Layout({ children }: { children: ReactNode }) {
  // Check if user is authenticated
  await requireAuth()

  return (
    <DashboardProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  )
}

