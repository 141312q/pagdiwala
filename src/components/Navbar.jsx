
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { useTheme } from "@/lib/theme-provider";
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  ClipboardList,
  Menu,
  X
} from "lucide-react";

export function Navbar() {
  const { getCurrentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const user = getCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = user ? [
    { to: "/cart", icon: ShoppingCart, label: "Cart" },
    { to: "/orders", icon: ClipboardList, label: "Orders" },
    ...(user.role === "admin" ? [{ to: "/admin", icon: User, label: "Admin" }] : []),
    { to: "/profile", icon: User, label: "Profile" }
  ] : [
    { to: "/signin", label: "Sign In" },
    { to: "/signup", label: "Sign Up" }
  ];

  // Logo URLs for light and dark modes
  const logoUrl = theme === "dark" 
    ? "https://storage.googleapis.com/hostinger-horizons-assets-prod/7c93ebdf-b121-46e6-8292-9989942be707/6c77e320895d481c85b7396201051199.png" // Dark mode logo
    : "https://storage.googleapis.com/hostinger-horizons-assets-prod/7c93ebdf-b121-46e6-8292-9989942be707/7a343a250296bacc1a2078b335a06824.png"; // Light mode logo

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-background border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img 
                src={logoUrl}
                alt="Pagdiwala Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-300"
              />
              <h1 className="text-xl md:text-2xl font-bold text-primary transition-colors duration-300">
                Pagdiwala
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button 
                  variant={isActive(item.to) ? "default" : "ghost"}
                  className="flex items-center gap-2"
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.label}
                </Button>
              </Link>
            ))}
            {user && (
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="block"
                >
                  <Button
                    variant={isActive(item.to) ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.label}
                  </Button>
                </Link>
              ))}
              {user && (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
