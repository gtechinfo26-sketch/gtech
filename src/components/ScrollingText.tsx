interface ScrollingTextProps {
  texts?: string[];
  className?: string;
}

export const ScrollingText = ({ 
  texts = [
    "🔧 CNC Machines",
    "⚙️ SPM Machines", 
    "🏭 Industrial Automation",
    "🛠️ Precision Engineering",
    "📞 24/7 Support",
    "🌟 Since 1996",
    "📍 Hosur, Tamil Nadu"
  ],
  className = "" 
}: ScrollingTextProps) => {
  // Duplicate texts for seamless infinite scroll
  const duplicatedTexts = [...texts, ...texts];

  return (
    <div className={`bg-primary/10 border-y border-primary/20 overflow-hidden ${className}`}>
      <div className="animate-scroll flex whitespace-nowrap py-3">
        {duplicatedTexts.map((text, index) => (
          <span 
            key={index} 
            className="mx-8 text-sm font-medium text-primary tracking-wide"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
