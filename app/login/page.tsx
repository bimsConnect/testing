import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Login ke dashboard admin",
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <LoginForm />
    </div>
  )
}

