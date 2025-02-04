import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedGradientDemo } from "@/components/ui/code-demo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with gradient background */}
      <header className="relative bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px] dark:bg-grid-slate-100/[0.03]" />
        </div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900/90 to-gray-900 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
              Regulation Training Portal
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Complete your required regulatory training and track your progress
              through our interactive learning platform
            </p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedGradientDemo />
        </div>
      </section>

      {/* Entry Points with subtle animation */}
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Employee Portal */}
          <Card className="p-8 hover:shadow-lg transition-all duration-200 border-primary/10">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Employee Portal</h2>
                <p className="text-muted-foreground">
                  Access your assigned training videos and complete regulatory
                  requirements
                </p>
              </div>
              <Link href="/employee/login" className="block">
                <Button
                  size="lg"
                  className="w-full transition-all hover:scale-[1.02]">
                  Employee Login
                </Button>
              </Link>
            </div>
          </Card>

          {/* Admin Portal */}
          <Card className="p-8 hover:shadow-lg transition-all duration-200 border-primary/10">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
                <p className="text-muted-foreground">
                  Monitor training progress and review employee performance
                  metrics
                </p>
              </div>
              <Link href="/admin/login" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full transition-all hover:scale-[1.02]">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
