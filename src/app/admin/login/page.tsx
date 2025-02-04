"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await supabase
        .from("employees")
        .select()
        .eq("employee_identifier", identifier)
        .eq("is_admin", true)
        .single();

      if (error || !data) {
        throw new Error("Invalid credentials");
      }

      // Here you would normally verify the password properly
      // This is just a basic example
      if (password === data.password) {
        localStorage.setItem("admin", JSON.stringify(data));
        router.push("/admin/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      setError("Invalid identifier or password");
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/20 via-background to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </div>
          <CardDescription>
            Enter your admin credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Employee Identifier</Label>
              <Input
                id="identifier"
                placeholder="Enter your identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
