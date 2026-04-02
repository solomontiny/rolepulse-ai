import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { jobs } from "@/data/jobs";

const COLORS = {
  primary: "hsl(185, 72%, 48%)",
  accent: "hsl(38, 92%, 58%)",
  destructive: "hsl(0, 72%, 55%)",
  success: "hsl(152, 60%, 45%)",
  muted: "hsl(215, 12%, 50%)",
};

const PIE_COLORS = [COLORS.primary, COLORS.accent, COLORS.destructive];

const customTooltipStyle = {
  backgroundColor: "hsl(220, 18%, 10%)",
  border: "1px solid hsl(220, 14%, 18%)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "hsl(210, 20%, 92%)",
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
      .map(([name, d]) => ({ name, avgImpact: Math.round(d.totalImpact / d.count), count: d.count }))
      .sort((a, b) => b.avgImpact - a.avgImpact);
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
    return categoryData.map((c) => ({ category: c.name, impact: c.avgImpact }));
  }, [categoryData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Bar chart */}
      <div className="bg-gradient-card rounded-xl border border-border/50 p-5">
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
          Avg AI Impact by Category
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 8 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(215,12%,50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: "hsl(210,20%,80%)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
            <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: "hsl(220,14%,14%)" }} />
            <Bar dataKey="avgImpact" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div className="bg-gradient-card rounded-xl border border-border/50 p-5">
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
          Automation Risk Distribution
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
              <span className="text-muted-foreground">{d.name} ({d.value})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radar chart */}
      <div className="bg-gradient-card rounded-xl border border-border/50 p-5">
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
          Category Impact Radar
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={70}>
            <PolarGrid stroke="hsl(220,14%,18%)" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(210,20%,80%)", fontSize: 9 }} />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
            <Radar dataKey="impact" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
