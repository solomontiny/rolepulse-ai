import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

const StatCard = ({ label, value, icon: Icon, trend, trendUp, color }: StatCardProps) => (
  <div className="bg-card rounded-2xl border border-border/60 p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-extrabold font-display mt-1.5">{value}</p>
        {trend && (
          <p className={`text-xs font-medium mt-1.5 ${trendUp ? "text-success" : "text-muted-foreground"}`}>
            {trend}
          </p>
        )}
      </div>
      <div className={`p-2.5 rounded-xl ${color || "bg-primary/8"}`}>
        <Icon className={`h-5 w-5 ${color ? "" : "text-primary"}`} />
      </div>
    </div>
  </div>
);

export default StatCard;
