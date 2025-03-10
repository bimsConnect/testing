import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtVerify, SignJWT } from "jose"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

const secretKey = process.env.JWT_SECRET || "your-secret-key"
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1d").sign(key)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function login(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
  
    if (!user) {
      return null;
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      return null;
    }
  
    // Create a session
    const session = await encrypt({
      id: user.id,
      username: user.username,
    });
  
    // Save the session in a cookie
    const cookieStore = await cookies(); // Tambahkan await di sini
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  
    return user;
  }
  
  export async function logout() {
    const cookieStore = await cookies(); // Tambahkan await di sini
    cookieStore.delete("session");
  }
  
  export async function getSession() {
    const cookieStore = await cookies(); // Tambahkan await di sini
    const session = cookieStore.get("session")?.value;
  
    if (!session) return null;
  
    return await decrypt(session);
  }
  
export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.id) return null

  const user = await prisma.user.findUnique({
    where: { id: session.id as string },
  })

  if (!user) return null

  return {
    id: user.id,
    username: user.username,
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

