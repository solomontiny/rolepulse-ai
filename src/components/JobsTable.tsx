import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Job } from "@/data/jobs";

const trendIcon = (trend: Job["demandTrend"]) => {
  if (trend === "rising") return <TrendingUp className="h-3.5 w-3.5 text-success" />;
  if (trend === "declining") return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
};

const riskBadge = (risk: Job["automationRisk"]) => {
  const styles = {
    low: "bg-success/15 text-success",
    medium: "bg-accent/15 text-accent",
    high: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${styles[risk]}`}>
      {risk}
    </span>
  );
};

const ImpactBar = ({ score }: { score: number }) => (
  <div className="flex items-center gap-2">
    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${score}%`,
          background: score > 75 ? "hsl(var(--destructive))" : score > 50 ? "hsl(var(--accent))" : "hsl(var(--success))",
        }}
      />
    </div>
    <span className="font-mono text-xs text-muted-foreground">{score}</span>
  </div>
);

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable = ({ jobs }: JobsTableProps) => (
  <div className="overflow-x-auto rounded-xl border border-border/50">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border/50 bg-muted/30">
          <th className="text-left p-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">Ticker</th>
          <th className="text-left p-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">Title</th>
          <th className="text-left p-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
          <th className="text-left p-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">AI Impact</th>
          <th className="text-left p-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Trend</th>
          <th className="text-left p-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Risk</th>
          <th className="p-3"></th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.ticker} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
            <td className="p-3 font-mono font-semibold text-primary">{job.ticker}</td>
            <td className="p-3 font-medium">{job.title}</td>
            <td className="p-3 text-muted-foreground hidden md:table-cell">{job.category}</td>
            <td className="p-3 hidden sm:table-cell"><ImpactBar score={job.aiImpactScore} /></td>
            <td className="p-3 hidden lg:table-cell">
              <div className="flex items-center gap-1.5">
                {trendIcon(job.demandTrend)}
                <span className="capitalize text-xs">{job.demandTrend}</span>
              </div>
            </td>
            <td className="p-3 hidden sm:table-cell">{riskBadge(job.automationRisk)}</td>
            <td className="p-3">
              <Link
                to={`/job/${job.ticker}`}
                className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors inline-flex"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {jobs.length === 0 && (
      <div className="p-12 text-center text-muted-foreground">No jobs match your search.</div>
    )}
  </div>
);

export default JobsTable;
