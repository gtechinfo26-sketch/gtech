import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-automation.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Industrial Automation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>

      {/* Animated Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rounded-full animate-float opacity-50" />
      <div className="absolute bottom-40 left-20 w-20 h-20 border border-primary/30 rounded-lg rotate-45 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse-glow" />

      {/* Content */}
      <div className="container relative z-10 px-4 pt-16">
        <div className="max-w-3xl">
          <div className="animate-slide-up">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-medium text-sm mb-6 tracking-wider uppercase">
              THE AUTOMATION PEOPLE
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Powering the{" "}
            <span className="text-gradient-primary">Future</span> of{" "}
            <span className="text-gradient-accent">Manufacturing</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            WE DON'T WANT TO PUSH OUR IDEAS ON TO CUSTOMERS, WE SIMPLY WANT TO MAKE WHAT THEY WANT
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/machines">
              <Button variant="hero" size="xl" className="group">
                Explore Machines
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div>
              <div className="font-display text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-muted-foreground text-sm">Machines Deployed</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-primary mb-1">98%</div>
              <div className="text-muted-foreground text-sm">Uptime Guarantee</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-primary mb-1">24/7</div>
              <div className="text-muted-foreground text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
