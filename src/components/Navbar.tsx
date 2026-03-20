import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isLoggedIn = !!role;

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("role");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Verify Card", path: "/verify" },
  ];

  if (isAdmin) {
    navItems.push({ label: "Admin", path: "/admin" });
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 group">
          <img src={logo} alt="nine8" className="h-9 w-auto" />
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            nine<span className="gradient-text">8</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 20px hsl(217, 91%, 60%, 0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAuth}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground text-sm font-semibold transition-all duration-300"
        >
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
