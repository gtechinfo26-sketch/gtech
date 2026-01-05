import { Cog, Zap, Shield, Headphones } from "lucide-react";

const features = [
  {
    icon: Cog,
    title: "Precision Engineering",
    description: "Our machines are built with unparalleled accuracy and attention to detail.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Maximize productivity with industry-leading speed and efficiency.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Built to last with robust construction and minimal maintenance needs.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert technical assistance available around the clock.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-accent font-medium text-xs mb-3 tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Built for <span className="text-gradient-accent">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            We deliver industrial automation solutions that exceed expectations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
