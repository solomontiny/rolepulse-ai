import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ label, value, icon: Icon, trend, trendUp }: StatCardProps) => (
  <div className="bg-gradient-card rounded-xl border border-border/50 p-5 hover:shadow-glow transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold font-display mt-1">{value}</p>
        {trend && (
          <p className={`text-xs font-mono mt-1 ${trendUp ? "text-success" : "text-destructive"}`}>
            {trend}
          </p>
        )}
      </div>
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  </div>
);

export default StatCard;
