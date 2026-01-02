import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedMachines } from "@/components/FeaturedMachines";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { ScrollingText } from "@/components/ScrollingText";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={!!user} onLogout={signOut} />
      <main>
        <HeroSection />
        <ScrollingText />
        <FeaturedMachines />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
