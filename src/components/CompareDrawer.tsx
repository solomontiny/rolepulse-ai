import { X, Brain, Shield, TrendingUp, TrendingDown, Minus } from "lucide-react";
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
  low: { color: "text-success", bg: "bg-success/10" },
  medium: { color: "text-warning", bg: "bg-warning/10" },
  high: { color: "text-destructive", bg: "bg-destructive/10" },
};

const MetricRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center py-3.5 border-b border-border/50">
    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">{label}</span>
    {children}
  </div>
);

const ImpactBar = ({ score }: { score: number }) => (
  <div className="space-y-1.5">
    <span className="text-xl font-extrabold font-display">{score}</span>
    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${score}%`,
          background: score > 75 ? "hsl(var(--destructive))" : score > 50 ? "hsl(var(--warning))" : "hsl(var(--success))",
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
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-card-hover animate-slide-in-bottom">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-lg">Compare Jobs</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-[120px_1fr_1fr] gap-4 pb-2">
          <div />
          <div>
            <span className="font-mono text-primary text-xs font-bold">{a.ticker}</span>
            <p className="font-display font-bold text-sm">{a.title}</p>
          </div>
          <div>
            <span className="font-mono text-primary text-xs font-bold">{b.ticker}</span>
            <p className="font-display font-bold text-sm">{b.title}</p>
          </div>
        </div>

        <div className="space-y-0">
          <MetricRow label="Category">
            <span className="text-sm font-medium">{a.category}</span>
            <span className="text-sm font-medium">{b.category}</span>
          </MetricRow>

          <MetricRow label="AI Exposure">
            <ImpactBar score={a.aiImpactScore} />
            <ImpactBar score={b.aiImpactScore} />
          </MetricRow>

          <MetricRow label="Direction">
            {[a, b].map((j) => {
              const t = trendConfig[j.demandTrend];
              const Icon = t.icon;
              return (
                <div key={j.ticker} className="flex items-center gap-1.5">
                  <Icon className={`h-4 w-4 ${t.color}`} />
                  <span className={`text-sm font-semibold ${t.color}`}>{t.label}</span>
                </div>
              );
            })}
          </MetricRow>

          <MetricRow label="Auto Level">
            {[a, b].map((j) => {
              const r = riskConfig[j.automationRisk];
              return (
                <span key={j.ticker} className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-bold capitalize w-fit ${r.bg} ${r.color}`}>
                  {j.automationRisk}
                </span>
              );
            })}
          </MetricRow>

          <MetricRow label="Salary Est.">
            <span className="text-lg font-extrabold font-display">{a.avgSalary}</span>
            <span className="text-lg font-extrabold font-display">{b.avgSalary}</span>
          </MetricRow>

          <MetricRow label="Growth">
            {[a, b].map((j) => (
              <span key={j.ticker} className={`font-mono text-sm font-semibold ${j.growthRate.startsWith("+") ? "text-success" : "text-destructive"}`}>
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
