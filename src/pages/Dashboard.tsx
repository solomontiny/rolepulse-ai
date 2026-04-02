import { useState, useMemo } from "react";
import { Search, Briefcase, Brain, TrendingUp, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import CategoryFilter from "@/components/CategoryFilter";
import JobsTable from "@/components/JobsTable";
import { jobs } from "@/data/jobs";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold font-display">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">AI impact across the labor market</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Briefcase} label="Jobs Tracked" value={jobs.length} />
          <StatCard icon={Brain} label="Avg AI Impact" value={avgImpact} trend="across all roles" />
          <StatCard icon={TrendingUp} label="Rising Demand" value={risingCount} trend={`of ${jobs.length} roles`} trendUp />
          <StatCard icon={AlertTriangle} label="High Risk" value={highRiskCount} trend="roles at risk" />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs or tickers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Table */}
        <JobsTable jobs={filtered} />
      </main>
    </div>
  );
};

export default Dashboard;
