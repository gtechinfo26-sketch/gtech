import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Loader2 } from "lucide-react";
import { useState } from "react";

interface Machine {
  id: string;
  name: string;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
  technical_info: string | null;
  specifications: Record<string, string> | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const MachineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showVideo, setShowVideo] = useState(false);

  const { data: machine, isLoading, error } = useQuery({
    queryKey: ["machine", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("machines")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Machine | null;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !machine) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Machine Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The machine you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/machines">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Machines
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const specifications = machine.specifications as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/machines" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Machines
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Media Section */}
            <div className="space-y-6">
              {/* Main Image/Video */}
              <div className="relative aspect-[4/3] bg-secondary rounded-2xl overflow-hidden">
                {showVideo && machine.video_url ? (
                  <video
                    src={machine.video_url}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : machine.image_url ? (
                  <>
                    <img
                      src={machine.image_url}
                      alt={machine.name}
                      className="w-full h-full object-cover"
                    />
                    {machine.video_url && (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                      >
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 border-2 border-primary/30 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary/20 rounded" />
                    </div>
                  </div>
                )}
              </div>

              {/* Video Toggle */}
              {machine.video_url && showVideo && (
                <Button
                  variant="outline"
                  onClick={() => setShowVideo(false)}
                  className="w-full"
                >
                  View Image
                </Button>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <span className="text-primary font-medium uppercase tracking-wider text-sm mb-2 block">
                  {machine.category}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {machine.name}
                </h1>
                {machine.is_featured && (
                  <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-sm font-bold uppercase tracking-wider rounded-full">
                    Featured Equipment
                  </span>
                )}
              </div>

              {/* Description */}
              {machine.description && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                    Overview
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {machine.description}
                  </p>
                </div>
              )}

              {/* Technical Information */}
              {machine.technical_info && (
                <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Technical Information
                  </h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {machine.technical_info}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {specifications && Object.keys(specifications).length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Specifications
                  </h2>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(specifications).map(([key, value], index) => (
                          <tr 
                            key={key} 
                            className={index % 2 === 0 ? "bg-secondary/30" : ""}
                          >
                            <td className="px-4 py-3 text-sm font-medium text-foreground">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Enquire About This Machine
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MachineDetail;
