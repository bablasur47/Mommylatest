import { useState } from "react";
import { useLogin } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useLogin({
    mutation: {
      onSuccess: (data) => {
        if (data.success) {
          localStorage.setItem("dashboard_token", data.token);
          setLocation("/overview");
        } else {
          toast({
            title: "Wrong password!",
            description: "Try again bestie 💀",
            variant: "destructive",
          });
        }
      },
      onError: () => {
        toast({
          title: "Connection error",
          description: "Could not reach the server.",
          variant: "destructive",
        });
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    loginMutation.mutate({ data: { password } });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-3/4 left-1/3 w-32 h-32 rounded-full bg-accent/10 blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Floating sparkles */}
      <div className="absolute top-20 left-20 text-2xl float-sparkle opacity-40" style={{ animationDelay: "0s" }}>✨</div>
      <div className="absolute top-32 right-24 text-xl float-sparkle opacity-30" style={{ animationDelay: "0.7s" }}>🌸</div>
      <div className="absolute bottom-28 left-28 text-lg float-sparkle opacity-40" style={{ animationDelay: "1.4s" }}>💖</div>
      <div className="absolute bottom-20 right-20 text-2xl float-sparkle opacity-30" style={{ animationDelay: "2.1s" }}>⭐</div>
      <div className="absolute top-1/2 left-10 text-xl float-sparkle opacity-20" style={{ animationDelay: "0.3s" }}>🌙</div>
      <div className="absolute top-1/3 right-10 text-lg float-sparkle opacity-20" style={{ animationDelay: "1.8s" }}>💫</div>

      <Card className="w-full max-w-sm relative bg-card/70 backdrop-blur-xl border-primary/30 shadow-2xl shadow-primary/20 bounce-in kawaii-glow">
        <CardHeader className="space-y-4 text-center pt-8 pb-4">
          {/* Avatar */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 via-purple-500/20 to-accent/20 flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
            <span className="text-3xl">🌸</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold gradient-text">mommy</h1>
            <p className="text-sm text-muted-foreground">Enter the secret to access the dashboard</p>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="🔑 Secret password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-border/60 focus-visible:ring-primary rounded-xl text-center text-sm h-11"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-semibold rounded-xl h-11 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50 hover:-translate-y-0.5"
              disabled={loginMutation.isPending || !password}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Checking...
                </span>
              ) : (
                "Enter Dashboard ✨"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
