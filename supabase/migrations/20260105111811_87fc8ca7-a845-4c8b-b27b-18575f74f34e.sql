-- Add video_url column to machines table
ALTER TABLE public.machines 
ADD COLUMN video_url text;

-- Add technical_info column for detailed technical specifications
ALTER TABLE public.machines 
ADD COLUMN technical_info text;