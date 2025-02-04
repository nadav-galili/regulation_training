"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    employeeId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // First check if the employee exists and is an admin
      const { data, error: queryError } = await supabase
        .from("employees")
        .select()
        .eq("email", credentials.employeeId)
        .eq("is_admin", true)
        .eq("password", credentials.password)
        .maybeSingle();

      if (queryError) throw queryError;

      if (!data) {
        setError("Invalid admin credentials");
        return;
      }

      // Store admin data
      localStorage.setItem("admin", JSON.stringify(data));
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to verify admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">
            Access the training management dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Admin ID"
              value={credentials.employeeId}
              onChange={(e) =>
                setCredentials({ ...credentials, employeeId: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Login to Dashboard
          </Button>
        </form>
      </Card>
    </div>
  );
}
