import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Zap, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-gradient-primary font-extrabold tracking-tight">RolePulse</span>
          <span className="text-muted-foreground font-medium text-xs bg-secondary px-1.5 py-0.5 rounded hidden sm:inline">AI</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === "/"
                ? "text-primary bg-primary/8 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Home className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === "/dashboard"
                ? "text-primary bg-primary/8 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
