import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
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

type SortKey = "ticker" | "title" | "aiImpactScore" | "demandTrend" | "automationRisk";
type SortDir = "asc" | "desc";

const trendOrder = { rising: 3, stable: 2, declining: 1 };
const riskOrder = { high: 3, medium: 2, low: 1 };

interface JobsTableProps {
  jobs: Job[];
  compareSelected?: string[];
  onToggleCompare?: (ticker: string) => void;
}

const JobsTable = ({ jobs, compareSelected = [], onToggleCompare }: JobsTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return jobs;
    return [...jobs].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "ticker":
        case "title":
          cmp = a[sortKey].localeCompare(b[sortKey]);
          break;
        case "aiImpactScore":
          cmp = a.aiImpactScore - b.aiImpactScore;
          break;
        case "demandTrend":
          cmp = trendOrder[a.demandTrend] - trendOrder[b.demandTrend];
          break;
        case "automationRisk":
          cmp = riskOrder[a.automationRisk] - riskOrder[b.automationRisk];
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [jobs, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3 text-primary" /> : <ArrowDown className="h-3 w-3 text-primary" />;
  };

  const thClass = "text-left p-3 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none";

  return (
    <div className="overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50 bg-muted/30">
            {onToggleCompare && <th className="p-3 w-10"></th>}
            <th className={thClass} onClick={() => handleSort("ticker")}>
              <span className="inline-flex items-center gap-1">Ticker <SortIcon col="ticker" /></span>
            </th>
            <th className={thClass} onClick={() => handleSort("title")}>
              <span className="inline-flex items-center gap-1">Title <SortIcon col="title" /></span>
            </th>
            <th className={`${thClass} hidden md:table-cell`}>Category</th>
            <th className={`${thClass} hidden sm:table-cell`} onClick={() => handleSort("aiImpactScore")}>
              <span className="inline-flex items-center gap-1">AI Exposure <SortIcon col="aiImpactScore" /></span>
            </th>
            <th className={`${thClass} hidden lg:table-cell`} onClick={() => handleSort("demandTrend")}>
              <span className="inline-flex items-center gap-1">Direction <SortIcon col="demandTrend" /></span>
            </th>
            <th className={`${thClass} hidden sm:table-cell`} onClick={() => handleSort("automationRisk")}>
              <span className="inline-flex items-center gap-1">Auto Level <SortIcon col="automationRisk" /></span>
            </th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((job) => (
            <tr key={job.ticker} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
              {onToggleCompare && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={compareSelected.includes(job.ticker)}
                    onChange={() => onToggleCompare(job.ticker)}
                    disabled={!compareSelected.includes(job.ticker) && compareSelected.length >= 2}
                    className="accent-[hsl(185,72%,48%)] h-3.5 w-3.5 cursor-pointer"
                  />
                </td>
              )}
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
      {sorted.length === 0 && (
        <div className="p-12 text-center text-muted-foreground">No jobs match your search.</div>
      )}
    </div>
  );
};

export default JobsTable;
