"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TutorialPage() {
  const router = useRouter();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    // Get employee data from localStorage
    const storedEmployee = localStorage.getItem("employee");
    if (!storedEmployee) {
      router.push("/employee/login");
      return;
    }
    setEmployee(JSON.parse(storedEmployee));
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Training Portal</h1>
            {employee && (
              <p className="text-muted-foreground">Welcome, {employee.name}</p>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              localStorage.removeItem("employee");
              router.push("/");
            }}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6">
          {/* Video Player Section */}
          <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
            <p className="text-muted-foreground">Video Player will be here</p>
          </div>

          {/* Controls Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Video Title Here</h2>
              <Button size="lg">Start Video</Button>
            </div>

            {/* Progress Indicator */}
            <div className="h-2 bg-muted rounded-full">
              <div className="h-full w-0 bg-primary rounded-full transition-all duration-300" />
            </div>

            {/* Question Section (hidden by default) */}
            <div className="hidden">
              <Card className="p-4 mt-4">
                <h3 className="text-lg font-medium mb-4">
                  Question will appear here
                </h3>
                <div className="space-y-2">
                  {/* Answer buttons will be mapped here */}
                  <Button className="w-full justify-start" variant="outline">
                    Sample Answer
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
