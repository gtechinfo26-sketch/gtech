import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MachineCard } from "@/components/MachineCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const FeaturedMachines = () => {
  const { data: machines, isLoading } = useQuery({
    queryKey: ["featured-machines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("machines")
        .select("*")
        .eq("is_featured", true)
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 bg-background relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary font-medium text-xs mb-3 tracking-wider uppercase">
            Our Machines
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Featured <span className="text-gradient-primary">Equipment</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Explore our selection of cutting-edge industrial automation machinery
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-secondary" />
                <div className="p-6">
                  <div className="h-4 bg-secondary rounded w-20 mb-3" />
                  <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-4 bg-secondary rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : machines && machines.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {machines.map((machine) => (
              <MachineCard
                key={machine.id}
                id={machine.id}
                name={machine.name}
                description={machine.description}
                category={machine.category}
                imageUrl={machine.image_url}
                isFeatured={machine.is_featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-primary/30 rounded" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No Featured Machines Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Check back soon for our featured equipment
            </p>
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/machines">
            <Button variant="glow" size="lg" className="group">
              View All Machines
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
