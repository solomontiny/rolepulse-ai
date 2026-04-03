import { Link } from "react-router-dom";
import { ArrowRight, Zap, Brain, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      {/* Hero */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <Zap className="h-3 w-3" />
            Live Data · 22 Jobs Tracked
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Track How AI Is{" "}
            <span className="text-gradient-primary">Changing Jobs</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: "0.35s" }}>
            Monitor AI exposure scores, automation levels, and market direction
            for every profession — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-all duration-200 hover:scale-105"
            >
              Explore Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container pb-20 md:pb-32">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Brain,
              title: "AI Exposure Scoring",
              desc: "Every role scored 0-100 on how much AI is transforming the field.",
            },
            {
              icon: Zap,
              title: "Market Direction",
              desc: "Track whether job demand is rising, stable, or declining over time.",
            },
            {
              icon: Shield,
              title: "Automation Level",
              desc: "Understand which roles face high, medium, or low automation threat.",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="bg-gradient-card rounded-xl border border-border/50 p-6 hover:shadow-glow transition-all duration-300 group hover:scale-[1.02] animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.6 + i * 0.15}s` }}
            >
              <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>

    <footer className="border-t border-border/50 py-8 animate-fade-in opacity-0" style={{ animationDelay: "1.1s" }}>
      <div className="container text-center space-y-1">
        <p className="text-xs text-muted-foreground">© 2026 RolePulse AI. All rights reserved.</p>
        <p className="text-[10px] text-muted-foreground/60">This is a prototype using sample data for illustrative purposes only.</p>
      </div>
    </footer>
  </div>
);

export default Landing;
