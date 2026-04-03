import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Zap } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <Zap className="h-5 w-5 text-primary" />
          <span className="text-gradient-primary">RolePulse</span>
          <span className="text-muted-foreground font-normal text-sm hidden sm:inline">AI</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === "/dashboard"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
