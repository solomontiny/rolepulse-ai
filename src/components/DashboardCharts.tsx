import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { jobs } from "@/data/jobs";

const COLORS = {
  primary: "hsl(252, 70%, 57%)",
  accent: "hsl(172, 62%, 42%)",
  destructive: "hsl(0, 68%, 56%)",
  success: "hsl(152, 55%, 42%)",
  warning: "hsl(38, 92%, 52%)",
  muted: "hsl(224, 12%, 48%)",
};

const PIE_COLORS = [COLORS.success, COLORS.warning, COLORS.destructive];

const customTooltipStyle = {
  backgroundColor: "hsl(0, 0%, 100%)",
  border: "1px solid hsl(225, 15%, 89%)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "hsl(224, 30%, 12%)",
  boxShadow: "0 4px 16px -2px rgba(0,0,0,0.08)",
};

const DashboardCharts = () => {
  const categoryData = useMemo(() => {
    const map: Record<string, { count: number; totalImpact: number }> = {};
    jobs.forEach((j) => {
      if (!map[j.category]) map[j.category] = { count: 0, totalImpact: 0 };
      map[j.category].count++;
      map[j.category].totalImpact += j.aiImpactScore;
    });
    return Object.entries(map)
      .map(([name, d]) => ({ name, avgExposure: Math.round(d.totalImpact / d.count), count: d.count }))
      .sort((a, b) => b.avgExposure - a.avgExposure);
  }, []);

  const riskData = useMemo(() => {
    const counts = { low: 0, medium: 0, high: 0 };
    jobs.forEach((j) => counts[j.automationRisk]++);
    return [
      { name: "Low", value: counts.low },
      { name: "Medium", value: counts.medium },
      { name: "High", value: counts.high },
    ];
  }, []);

  const radarData = useMemo(() => {
    return categoryData.map((c) => ({ category: c.name, exposure: c.avgExposure }));
  }, [categoryData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Bar chart */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
        <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-4">
          Avg AI Exposure by Category
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 8 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(224,12%,48%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: "hsl(224,30%,12%)", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} width={80} />
            <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: "hsl(225,18%,93%)" }} />
            <Bar dataKey="avgExposure" fill={COLORS.primary} radius={[0, 6, 6, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
        <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-4">
          Automation Level Distribution
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={riskData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4} strokeWidth={0}>
              {riskData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip contentStyle={customTooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {riskData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
              <span className="text-muted-foreground font-medium">{d.name} ({d.value})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radar chart */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
        <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-4">
          Category Exposure Radar
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={70}>
            <PolarGrid stroke="hsl(225,15%,89%)" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(224,30%,12%)", fontSize: 9, fontWeight: 500 }} />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
            <Radar dataKey="exposure" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
