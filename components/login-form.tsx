"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginAction } from "@/app/actions/auth-actions";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Login Error:", error); // Menampilkan error ke console (opsional)
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error sebelum login

    try {
      const result = await loginAction(username, password);

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "Username atau password salah");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">Masuk ke dashboard admin</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error.length > 0 && (
            <div className="p-3 text-sm text-white bg-destructive rounded-md">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="Masukkan username"
                className="pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Sembunyikan password" : "Tampilkan password"}</span>
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          Kembali ke Beranda
        </Link>
      </CardFooter>
    </Card>
  );
}
