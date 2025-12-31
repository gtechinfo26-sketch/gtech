import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cog, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar = ({ isAuthenticated, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 group-hover:glow-primary transition-all duration-300">
              <Cog className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-foreground">
              GAYATHRI <span className="text-primary">TECHNOCRATS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/machines" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Machines
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button variant="glow" size="sm">
                    Admin Panel
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/machines" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Machines
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/admin">
                    <Button variant="glow" size="sm" className="w-full">
                      Admin Panel
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={onLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="hero" size="sm" className="w-full">
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
