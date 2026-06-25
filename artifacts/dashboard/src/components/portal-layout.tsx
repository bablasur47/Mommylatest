import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearPortalToken } from "@/lib/portal";

const navItems = [
  { href: "/portal/home", label: "Home", icon: Home, emoji: "🏠" },
  { href: "/portal/history", label: "History", icon: MessageSquare, emoji: "💬" },
  { href: "/portal/settings", label: "Settings", icon: Settings, emoji: "⚙️" },
];

export function PortalLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();

  function handleLogout() {
    clearPortalToken();
    setLocation("/portal");
  }

  function isActive(href: string) {
    return location === href || location.startsWith(href + "/");
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 border-r border-border/60 bg-card/30 backdrop-blur-xl flex-col shrink-0 relative overflow-hidden">
        <div className="absolute top-16 right-3 w-1.5 h-1.5 rounded-full bg-primary/50 float-sparkle" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-40 left-4 w-2 h-2 rounded-full bg-accent/40 float-sparkle" style={{ animationDelay: "1.5s" }} />

        <div className="h-16 flex items-center px-5 border-b border-border/60 gap-3 bg-background/20">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 border border-primary/40 flex items-center justify-center shadow shadow-primary/20">
            <span className="text-base">🌸</span>
          </div>
          <div>
            <div className="font-bold text-sm gradient-text leading-tight">mommy</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Your portal</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all cursor-pointer border ${
                isActive(item.href)
                  ? "bg-primary/15 text-primary font-semibold border-primary/30 shadow shadow-primary/10"
                  : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border/50"
              }`}>
                <span className="text-base">{item.emoji}</span>
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border/60">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-500/10 text-sm rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden h-14 border-b border-border/60 flex items-center justify-between px-4 bg-background/80 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 border border-primary/30 flex items-center justify-center shadow shadow-primary/20">
              <span className="text-sm">🌸</span>
            </div>
            <span className="font-bold text-sm gradient-text">mommy</span>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-400" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4 pb-24 md:pb-8 md:p-8">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>
      </main>

      {/* Mobile bottom nav */}
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
