const customers = [
  { name: "Tata Steel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png" },
  { name: "Larsen & Toubro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Larsen_%26_Toubro_logo.svg/200px-Larsen_%26_Toubro_logo.svg.png" },
  { name: "Bharat Heavy Electricals", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/BHEL.svg/200px-BHEL.svg.png" },
  { name: "Ashok Leyland", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ashok_Leyland_logo.svg/200px-Ashok_Leyland_logo.svg.png" },
  { name: "Mahindra & Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mahindra_Rise_logo.svg/200px-Mahindra_Rise_logo.svg.png" },
  { name: "Hindustan Aeronautics", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Hindustan_Aeronautics_Limited_Logo.svg/200px-Hindustan_Aeronautics_Limited_Logo.svg.png" },
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
