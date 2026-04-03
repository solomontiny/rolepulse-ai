import { Link } from "react-router-dom";
import { ArrowRight, Zap, Brain, Shield, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      {/* Hero */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <Zap className="h-3 w-3" />
            Live Data · 25 Jobs Tracked
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Track How AI Is{" "}
            <span className="text-gradient-primary">Changing Jobs</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: "0.35s" }}>
            Understand AI exposure, automation levels, demand shifts, and role
            resilience across every profession — powered by real-time intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow hover:shadow-lg transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5"
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
              desc: "Every role scored 0-100 on how deeply AI is transforming the work.",
              color: "from-primary/10 to-purple-100/60",
              iconBg: "bg-primary/10 text-primary",
            },
            {
              icon: TrendingUp,
              title: "Market Direction",
              desc: "See demand shifts — which roles are rising, stable, or declining.",
              color: "from-accent/10 to-teal-100/60",
              iconBg: "bg-accent/10 text-accent",
            },
            {
              icon: Shield,
              title: "Automation Level",
              desc: "Assess which professions face high, medium, or low automation threat.",
              color: "from-warning/10 to-amber-100/60",
              iconBg: "bg-warning/10 text-warning",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className={`bg-gradient-to-br ${f.color} rounded-2xl border border-border/60 p-7 hover:shadow-card-hover transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-1 animate-fade-in-up opacity-0`}
              style={{ animationDelay: `${0.6 + i * 0.15}s` }}
            >
              <div className={`p-2.5 rounded-xl ${f.iconBg} w-fit mb-5`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>

    <footer className="border-t border-border py-8 animate-fade-in opacity-0" style={{ animationDelay: "1.1s" }}>
      <div className="container text-center space-y-1">
        <p className="text-xs text-muted-foreground">© 2026 RolePulse AI</p>
        <p className="text-[11px] text-muted-foreground/70">Prototype using sample data for future-of-work exploration.</p>
      </div>
    </footer>
  </div>
);

export default Landing;
