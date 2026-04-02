import { useState, useMemo } from "react";
import { Search, Briefcase, Brain, TrendingUp, AlertTriangle, GitCompareArrows } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import CategoryFilter from "@/components/CategoryFilter";
import JobsTable from "@/components/JobsTable";
import DashboardCharts from "@/components/DashboardCharts";
import CompareDrawer from "@/components/CompareDrawer";
import { jobs } from "@/data/jobs";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [compareSelected, setCompareSelected] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchCat = category === "All" || j.category === category;
      const matchSearch =
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.ticker.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const avgImpact = Math.round(jobs.reduce((a, j) => a + j.aiImpactScore, 0) / jobs.length);
  const risingCount = jobs.filter((j) => j.demandTrend === "rising").length;
  const highRiskCount = jobs.filter((j) => j.automationRisk === "high").length;

  const toggleCompare = (ticker: string) => {
    setCompareSelected((prev) =>
      prev.includes(ticker) ? prev.filter((t) => t !== ticker) : prev.length < 2 ? [...prev, ticker] : prev
    );
  };

  const compareJobs = compareSelected.map((t) => jobs.find((j) => j.ticker === t)!).filter(Boolean);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8 space-y-8">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-2xl font-bold font-display">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">AI impact across the labor market</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Briefcase, label: "Jobs Tracked", value: jobs.length },
            { icon: Brain, label: "Avg AI Impact", value: avgImpact, trend: "across all roles" },
            { icon: TrendingUp, label: "Rising Demand", value: risingCount, trend: `of ${jobs.length} roles`, trendUp: true },
            { icon: AlertTriangle, label: "High Risk", value: highRiskCount, trend: "roles at risk" },
          ].map((s, i) => (
            <div key={s.label} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
              <StatCard {...s} />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
          <DashboardCharts />
        </div>

        {/* Filters + Compare */}
        <div className="space-y-4 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs or tickers…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <button
              onClick={() => setShowCompare(true)}
              disabled={compareSelected.length !== 2}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:opacity-90 shadow-glow hover:scale-105"
            >
              <GitCompareArrows className="h-4 w-4" />
              Compare {compareSelected.length > 0 && `(${compareSelected.length}/2)`}
            </button>
          </div>
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Table */}
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.7s" }}>
          <JobsTable jobs={filtered} compareSelected={compareSelected} onToggleCompare={toggleCompare} />
        </div>
      </main>

      {showCompare && compareJobs.length === 2 && (
        <CompareDrawer jobs={compareJobs} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
};

export default Dashboard;
