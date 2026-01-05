const customers = [
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
  ];

export const CustomersSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Trusted <span className="text-primary">Customers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proudly serving leading industries across India with quality machinery and reliable service.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-4 rounded-lg bg-card hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-16 w-full flex items-center justify-center">
                <img
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors">
                {customer.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
