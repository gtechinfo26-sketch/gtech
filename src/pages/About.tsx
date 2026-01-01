import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Cog, Target, Award, Users } from "lucide-react";

const About = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={!!user} onLogout={signOut} />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Gayathri Technocrats</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are a leading provider of industrial automation solutions, delivering cutting-edge 
              machinery and technology to businesses across industries.
              
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 animate-slide-up">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower industries with innovative automation solutions that enhance productivity, 
                reduce operational costs, and drive sustainable growth. We are committed to delivering 
                excellence through cutting-edge technology and exceptional service.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted partner for industrial automation, recognized for our 
                innovation, reliability, and commitment to customer success. We envision a future 
                where every industry benefits from smart, efficient automation.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-primary">Us?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Cog,
                title: "RC DETAILS",
                description: "TIN No:33333361542 C.S.T No:673824	Dt:31-07-1996 GST No:33AKZPK8485E1ZH AREA CODE: 175 C.E No: AKZPK8485EXM001 PAN No: AKZPK8485E"
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Every machine we deliver undergoes rigorous quality testing to ensure optimal performance and longevity."
              },
              {
                icon: Users,
                title: "Customer Support",
                description: "We provide comprehensive after-sales support, training, and maintenance services to keep your operations running smoothly."
              }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Stats */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "30+", label: "Years Experience" },
                { value: "500+", label: "Machines Delivered" },
                { value: "200+", label: "Happy Clients" },
                { value: "24/7", label: "Support Available" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
