"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EmployeeLogin() {
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // First get the data without .single()
      const { data, error } = await supabase
        .from("employees")
        .select()
        .eq("employee_identifier", employeeId);

      if (error) throw error;

      // Check if we got any results
      if (data && data.length > 0) {
        localStorage.setItem("employee", JSON.stringify(data[0]));
        router.push("/employee/tutorials");
      } else {
        setError("Employee ID not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to verify employee ID");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
