import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedGradientDemo } from "@/components/ui/code-demo";
import Link from "next/link";
import { UserCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with gradient background */}
      <header className="relative bg-gradient-to-b from-primary/20 via-background to-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px] dark:bg-grid-slate-100/[0.03]" />
        </div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <TypewriterEffectSmooth
              words={[
                { text: "Regulation" },
                { text: "Training" },
                { text: "Portal", className: "text-primary" },
              ]}
              className="justify-center"
              cursorClassName="bg-primary"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Complete your required regulatory training and track your progress
              through our interactive learning platform
            </motion.p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <AnimatedGradientDemo />
        </div>
      </section>

      {/* Entry Points with subtle animation */}
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Employee Portal */}
          <Card className="p-8 hover:shadow-lg transition-all duration-200 border-primary/10 group">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <UserCircle2 className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">
                    Employee Portal
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  Access your assigned training videos and complete regulatory
                  requirements
                </p>
              </div>
              <Link href="/employee/login" className="block">
                <Button
                  size="lg"
                  className="w-full transition-all group-hover:scale-[1.02] gap-2">
                  Employee Login
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Admin Portal */}
          <Card className="p-8 hover:shadow-lg transition-all duration-200 border-primary/10 group">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">
                    Admin Dashboard
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  Monitor training progress and review employee performance
                  metrics
                </p>
              </div>
              <Link href="/admin/login" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full transition-all group-hover:scale-[1.02] gap-2 hover:bg-primary hover:text-primary-foreground">
                  Admin Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
