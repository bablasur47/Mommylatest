import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useLogout } from "@workspace/api-client-react";
import { Activity, Server, Users, Key, BrainCircuit, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/overview", label: "Overview", icon: Activity, emoji: "✨" },
  { href: "/servers", label: "Servers", icon: Server, emoji: "🌸" },
  { href: "/users", label: "Users", icon: Users, emoji: "💖" },
  { href: "/apis", label: "API Keys", icon: Key, emoji: "🔑" },
  { href: "/personality", label: "Personality", icon: BrainCircuit, emoji: "🧠" },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const logoutMutation = useLogout({
    mutation: {
      onSuccess: () => {
        localStorage.removeItem("dashboard_token");
        setLocation("/login");
      },
    },
  });

  function isActive(href: string) {
    return location === href || location.startsWith(href + "/");
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-64 border-r border-border/60 bg-card/40 backdrop-blur-xl flex-col shrink-0 relative overflow-hidden">
        {/* Decorative sparkles */}
        <div className="absolute top-20 right-4 w-2 h-2 rounded-full bg-primary/40 float-sparkle" style={{ animationDelay: "0s" }} />
        <div className="absolute top-48 left-3 w-1.5 h-1.5 rounded-full bg-accent/50 float-sparkle" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 right-6 w-2 h-2 rounded-full bg-purple-400/40 float-sparkle" style={{ animationDelay: "2s" }} />

        {/* Logo area */}
        <div className="h-16 flex items-center px-5 border-b border-border/60 bg-background/30 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
              <span className="text-lg">🌸</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight tracking-tight text-sm gradient-text">mommy</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 cursor-pointer group ${
                isActive(item.href)
                  ? "bg-primary/15 text-primary font-semibold border border-primary/30 shadow shadow-primary/10 kawaii-glow"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground hover:border hover:border-border/80 border border-transparent"
              }`}>
                <span className="text-base">{item.emoji}</span>
                <item.icon className={`w-4 h-4 ${isActive(item.href) ? "text-primary" : "group-hover:text-foreground"}`} />
                {item.label}
                {isActive(item.href) && (
                  <Sparkles className="w-3 h-3 ml-auto text-primary/60" />
                )}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/60 bg-background/20">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl text-sm"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden h-14 border-b border-border/60 flex items-center justify-between px-4 bg-background/80 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center border border-primary/30 shadow shadow-primary/20">
              <span className="text-sm">🌸</span>
            </div>
            <span className="font-bold text-sm gradient-text">mommy</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-red-400"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-4 pb-24 md:pb-8 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* ── Mobile bottom navigation bar ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur border-t border-border/60 z-20 flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex-1">
            <span className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
              isActive(item.href) ? "text-primary" : "text-muted-foreground"
            }`}>
              <span className="text-base leading-none">{item.emoji}</span>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
