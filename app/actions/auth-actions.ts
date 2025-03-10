"use server"

import { login, logout } from "@/lib/auth"

export async function loginAction(username: string, password: string) {
  try {
    const user = await login(username, password)

    if (!user) {
      return {
        success: false,
        error: "Username atau password salah",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "Terjadi kesalahan saat login",
    }
  }
}

export async function logoutAction() {
  await logout()
  return { success: true }
}

