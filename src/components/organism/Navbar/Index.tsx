import useAuth from "@/hooks/useAuth";
import { Moon, Sun } from "lucide-react";
import { useGetMe } from "@/service/auth";
import { useTheme } from "@/context/ThemeProvider";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const auth = useAuth()
  const { data } = useGetMe();
  const { setTheme } = useTheme();
  const { pathname } = useLocation();

  if (!auth) return null
  
  return (
    <nav className="fixed top-0 z-10  w-full bg-background/30 backdrop-blur-xl transform-gpu flex items-center justify-between h-16 px-6 md:px-12 border-b">
      <ul className="flex items-center gap-6">
        <li
          className={`text-sm ${
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          } hover:text-primary font-medium`}
        >
          <Link to="/">Dashboard</Link>
        </li>
        <li
          className={`text-sm ${
            pathname === "/profile" ? "text-primary" : "text-muted-foreground"
          } hover:text-primary font-medium`}
        >
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <div className="flex gap-6 items-center">
        <button className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
          <Sun
            onClick={() => setTheme("dark")}
            className="h-5 w-5"
          />
        </button>
        <button className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
          <Moon
            onClick={() => setTheme("light")}
            className="h-5 w-5"
          />
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-500 overflow-hidden">
          <img
            src={data?.avatar}
            alt="profile picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
