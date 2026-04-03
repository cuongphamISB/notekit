import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavigationTabs = () => {
  const location = useLocation();

  return (
    <nav className="nav-tabs-container" aria-label="Menu chính">
      <Link
        to="/goc-chon-so"
        className={cn(
          "nav-tab nav-tab-blue",
          location.pathname === "/goc-chon-so" && "active"
        )}
      >
        <span className="nav-tab-text">Góc chọn sổ</span>
      </Link>
      <Link
        to="/note-ra-la-ro"
        className={cn(
          "nav-tab nav-tab-pink",
          location.pathname === "/note-ra-la-ro" && "active"
        )}
      >
        <span className="nav-tab-text">Về tụi tui</span>
      </Link>
    </nav>
  );
};

export default NavigationTabs;
