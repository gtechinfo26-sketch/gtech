-- Create customers table
CREATE TABLE public.customers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo_url text,
  description text,
  is_featured boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Public can view customers
CREATE POLICY "Anyone can view customers" 
ON public.customers 
FOR SELECT 
USING (true);

-- Authenticated users can manage customers
CREATE POLICY "Authenticated users can insert customers" 
ON public.customers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers" 
ON public.customers 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete customers" 
ON public.customers 
FOR DELETE 
TO authenticated
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();