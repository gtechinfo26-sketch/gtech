interface ScrollingTextProps {
  texts?: string[];
  className?: string;
}

export const ScrollingText = ({ 
  texts = [
    " TATA ELECTRONICS ",
    " INDIA NIPPON ELECTRICALS LTD ",
    " ABB LTD ",
    " TITAN INDUSTRIES LTD ",
    " MANDO BRAKES INDIA LTD ",
    " IGARASHI MOTORS LTD ",
    " TVS CHERRY LTD ",
     " HARITHA SEATINGS LTD ",
    " PRIMUS GLOVES PVT LTD ", 
    " LUCAS TVS ",
    " DELPHI TVS ",
    " SARATH TECHNOLOGIES ",
    " BTS CLOTHING PVT. LTD ",
    " SUNDARAM CLYTON ",
    " HARITA RUBBER ", 
    "  ZF ELECTRONICS TVS PVT. LTD ",
    " BANGALORE REFINERY ",
    " LAKSHMI ELCTRICAL CONTROL SYSTEMS LTD ",
    " RACHEL ENGINEERING ", 
    "SIGMA POWER & ENERGY ENGINEERS ",
    " SUDARSAN AUTO COMPONENTS PVT. LTD ",
    " TVS MOTORS COMPANY LTD ",
    " MACUREX SENSORS PVT LTD ",
    " N.N. AUTOLINX ",
    " MULTILINK ",
    " SAME DEUTZ - FAHR INDIA ( P ) LTD ",
    " CUMI, HOSUR ",
    " YAMAHA ELECTRONICS LTD ",
    " UCAL FUEL SYSTEMS ",
    " GABBRIAL  LIMITED ",
    " TATA ELECTRONICS ",
    " WABTECH ",
    " FAIVELEY ", 
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
