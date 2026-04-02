import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Brain, Shield, DollarSign, BarChart3 } from "lucide-react";
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
    rising: { icon: TrendingUp, color: "text-success", bg: "bg-success/15" },
    stable: { icon: Minus, color: "text-muted-foreground", bg: "bg-muted" },
    declining: { icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/15" },
  };

  const riskConfig = {
    low: { color: "text-success", bg: "bg-success/15" },
    medium: { color: "text-accent", bg: "bg-accent/15" },
    high: { color: "text-destructive", bg: "bg-destructive/15" },
  };

  const TrendIcon = trendConfig[job.demandTrend].icon;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8 max-w-3xl space-y-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-primary text-sm font-semibold bg-primary/10 px-2.5 py-1 rounded-md">
              {job.ticker}
            </span>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">{job.category}</span>
          </div>
          <h1 className="text-3xl font-bold font-display">{job.title}</h1>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-card rounded-xl border border-border/50 p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Brain className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-medium">AI Impact</span>
            </div>
            <p className="text-2xl font-bold font-display">{job.aiImpactScore}</p>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${job.aiImpactScore}%`,
                  background: job.aiImpactScore > 75 ? "hsl(var(--destructive))" : job.aiImpactScore > 50 ? "hsl(var(--accent))" : "hsl(var(--success))",
                }}
              />
            </div>
          </div>

          <div className="bg-gradient-card rounded-xl border border-border/50 p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendIcon className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Demand</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${trendConfig[job.demandTrend].bg} ${trendConfig[job.demandTrend].color}`}>
              {job.demandTrend}
            </div>
          </div>

          <div className="bg-gradient-card rounded-xl border border-border/50 p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Auto Risk</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${riskConfig[job.automationRisk].bg} ${riskConfig[job.automationRisk].color}`}>
              {job.automationRisk}
            </div>
          </div>

          <div className="bg-gradient-card rounded-xl border border-border/50 p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Avg Salary</span>
            </div>
            <p className="text-xl font-bold font-display">{job.avgSalary}</p>
            <p className={`text-xs font-mono ${job.growthRate.startsWith("+") ? "text-success" : "text-destructive"}`}>
              {job.growthRate} growth
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="font-display font-semibold text-sm">Analysis</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{job.summary}</p>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;
