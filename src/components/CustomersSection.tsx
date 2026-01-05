import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2 } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  is_featured: boolean;
}

export const CustomersSection = () => {
  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      return data as Customer[];
    },
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Our Trusted <span className="text-primary">Customers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card animate-pulse">
                <div className="h-12 w-12 bg-secondary rounded" />
                <div className="h-3 w-20 bg-secondary rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!customers || customers.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Our Trusted <span className="text-primary">Customers</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Proudly serving leading industries across India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card hover:shadow-md transition-all duration-300 group"
            >
              <div className="h-12 w-full flex items-center justify-center">
                {customer.logo_url ? (
                  <img
                    src={customer.logo_url}
                    alt={`${customer.name} logo`}
                    className="max-h-10 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors line-clamp-1">
                {customer.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
