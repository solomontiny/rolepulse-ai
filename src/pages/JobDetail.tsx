import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Brain, Shield, DollarSign, BarChart3, Lightbulb, Wrench, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import { jobs } from "@/data/jobs";

const JobDetail = () => {
  const { ticker } = useParams();
  const job = jobs.find((j) => j.ticker === ticker);

  if (!job) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Job not found.</p>
          <Link to="/dashboard" className="text-primary text-sm mt-4 inline-block hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const trendConfig = {
    rising: { icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
    stable: { icon: Minus, color: "text-muted-foreground", bg: "bg-muted" },
    declining: { icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
  };

  const riskConfig = {
    low: { color: "text-success", bg: "bg-success/10" },
    medium: { color: "text-warning", bg: "bg-warning/10" },
    high: { color: "text-destructive", bg: "bg-destructive/10" },
  };

  const TrendIcon = trendConfig[job.demandTrend].icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container py-8 max-w-3xl space-y-8 flex-1">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="space-y-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-primary text-sm font-bold bg-primary/8 px-3 py-1 rounded-lg">
              {job.ticker}
            </span>
            <span className="text-xs text-muted-foreground font-medium bg-secondary px-2.5 py-1 rounded-lg">{job.category}</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display tracking-tight">{job.title}</h1>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.35s" }}>
          <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Brain className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-bold">AI Exposure</span>
            </div>
            <p className="text-2xl font-extrabold font-display">{job.aiImpactScore}</p>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${job.aiImpactScore}%`,
                  background: job.aiImpactScore > 75 ? "hsl(var(--destructive))" : job.aiImpactScore > 50 ? "hsl(var(--warning))" : "hsl(var(--success))",
                }}
              />
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendIcon className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-bold">Direction</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${trendConfig[job.demandTrend].bg} ${trendConfig[job.demandTrend].color}`}>
              {job.demandTrend}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-bold">Auto Level</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${riskConfig[job.automationRisk].bg} ${riskConfig[job.automationRisk].color}`}>
              {job.automationRisk}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-bold">Salary Est.</span>
            </div>
            <p className="text-xl font-extrabold font-display">{job.avgSalary}</p>
            <p className={`text-xs font-mono font-semibold ${job.growthRate.startsWith("+") ? "text-success" : "text-destructive"}`}>
              {job.growthRate} growth
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="font-display font-bold text-sm">Analysis</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{job.summary}</p>
        </div>

        {/* Skills to Stay Relevant */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-accent/10">
              <Lightbulb className="h-4 w-4 text-accent" />
            </div>
            <h2 className="font-display font-bold text-sm">Skills to Stay Relevant</h2>
          </div>
          <ul className="space-y-2.5">
            {job.skillsToStayRelevant.map((skill) => (
              <li key={skill} className="flex items-start gap-3">
                <div className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-muted-foreground text-sm leading-relaxed">{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended AI Tools */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in-up opacity-0" style={{ animationDelay: "0.7s" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-primary/8">
              <Wrench className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-display font-bold text-sm">Recommended AI Tools</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.recommendedAITools.map((tool) => (
              <span key={tool} className="px-3.5 py-2 rounded-xl bg-primary/6 border border-primary/12 text-primary text-xs font-semibold">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Career Outlook */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in-up opacity-0" style={{ animationDelay: "0.8s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-success/10">
              <Compass className="h-4 w-4 text-success" />
            </div>
            <h2 className="font-display font-bold text-sm">Career Outlook</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{job.careerOutlook}</p>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container text-center">
          <p className="text-[11px] text-muted-foreground/70">Prototype using sample data for future-of-work exploration.</p>
        </div>
      </footer>
    </div>
  );
};

export default JobDetail;
