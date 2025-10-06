-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  total_coins INTEGER DEFAULT 0 NOT NULL,
  trees_planted INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create tree_posts table
CREATE TABLE public.tree_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  location TEXT,
  tree_count INTEGER DEFAULT 1 NOT NULL,
  coins_earned INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on tree_posts
ALTER TABLE public.tree_posts ENABLE ROW LEVEL SECURITY;

-- Tree posts policies
CREATE POLICY "Tree posts are viewable by everyone"
  ON public.tree_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create own posts"
  ON public.tree_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON public.tree_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON public.tree_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for tree images
INSERT INTO storage.buckets (id, name, public)
VALUES ('tree-images', 'tree-images', true);

-- Storage policies for tree images
CREATE POLICY "Anyone can view tree images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tree-images');

CREATE POLICY "Authenticated users can upload tree images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'tree-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'tree-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'tree-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update profile coins and tree count
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    total_coins = total_coins + NEW.coins_earned,
    trees_planted = trees_planted + NEW.tree_count
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

-- Trigger to update user stats when tree post is created
CREATE TRIGGER on_tree_post_created
  AFTER INSERT ON public.tree_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats();