import { X, Brain, Shield, TrendingUp, TrendingDown, Minus, DollarSign, BarChart3 } from "lucide-react";
import type { Job } from "@/data/jobs";

interface CompareDrawerProps {
  jobs: Job[];
  onClose: () => void;
}

const trendConfig = {
  rising: { icon: TrendingUp, color: "text-success", label: "Rising" },
  stable: { icon: Minus, color: "text-muted-foreground", label: "Stable" },
  declining: { icon: TrendingDown, color: "text-destructive", label: "Declining" },
};

const riskConfig = {
  low: { color: "text-success", bg: "bg-success/15" },
  medium: { color: "text-accent", bg: "bg-accent/15" },
  high: { color: "text-destructive", bg: "bg-destructive/15" },
};

const MetricRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center py-3 border-b border-border/30">
    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
    {children}
  </div>
);

const ImpactBar = ({ score }: { score: number }) => (
  <div className="space-y-1">
    <span className="text-xl font-bold font-display">{score}</span>
    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${score}%`,
          background: score > 75 ? "hsl(var(--destructive))" : score > 50 ? "hsl(var(--accent))" : "hsl(var(--success))",
        }}
      />
    </div>
  </div>
);

const CompareDrawer = ({ jobs, onClose }: CompareDrawerProps) => {
  if (jobs.length !== 2) return null;
  const [a, b] = jobs;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4 animate-slide-in-bottom">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg">Compare Jobs</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Headers */}
        <div className="grid grid-cols-[120px_1fr_1fr] gap-4 pb-2">
          <div />
          <div>
            <span className="font-mono text-primary text-xs font-semibold">{a.ticker}</span>
            <p className="font-display font-semibold text-sm">{a.title}</p>
          </div>
          <div>
            <span className="font-mono text-primary text-xs font-semibold">{b.ticker}</span>
            <p className="font-display font-semibold text-sm">{b.title}</p>
          </div>
        </div>

        <div className="space-y-0">
          <MetricRow label="Category">
            <span className="text-sm">{a.category}</span>
            <span className="text-sm">{b.category}</span>
          </MetricRow>

          <MetricRow label="AI Impact">
            <ImpactBar score={a.aiImpactScore} />
            <ImpactBar score={b.aiImpactScore} />
          </MetricRow>

          <MetricRow label="Demand">
            {[a, b].map((j) => {
              const t = trendConfig[j.demandTrend];
              const Icon = t.icon;
              return (
                <div key={j.ticker} className="flex items-center gap-1.5">
                  <Icon className={`h-4 w-4 ${t.color}`} />
                  <span className={`text-sm font-medium ${t.color}`}>{t.label}</span>
                </div>
              );
            })}
          </MetricRow>

          <MetricRow label="Auto Risk">
            {[a, b].map((j) => {
              const r = riskConfig[j.automationRisk];
              return (
                <span key={j.ticker} className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize w-fit ${r.bg} ${r.color}`}>
                  {j.automationRisk}
                </span>
              );
            })}
          </MetricRow>

          <MetricRow label="Avg Salary">
            <span className="text-lg font-bold font-display">{a.avgSalary}</span>
            <span className="text-lg font-bold font-display">{b.avgSalary}</span>
          </MetricRow>

          <MetricRow label="Growth">
            {[a, b].map((j) => (
              <span key={j.ticker} className={`font-mono text-sm ${j.growthRate.startsWith("+") ? "text-success" : "text-destructive"}`}>
                {j.growthRate}
              </span>
            ))}
          </MetricRow>
        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;
