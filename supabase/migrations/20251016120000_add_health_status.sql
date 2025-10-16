ALTER TABLE public.tree_posts
ADD COLUMN IF NOT EXISTS health_status TEXT DEFAULT 'Healthy';
