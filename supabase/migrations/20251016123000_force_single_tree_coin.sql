CREATE OR REPLACE FUNCTION public.force_single_tree_coin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS 
BEGIN
  NEW.tree_count := 1;
  NEW.coins_earned := 1;
  RETURN NEW;
END;
;

DROP TRIGGER IF EXISTS trg_force_single_tree_coin_ins ON public.tree_posts;
CREATE TRIGGER trg_force_single_tree_coin_ins
BEFORE INSERT ON public.tree_posts
FOR EACH ROW
EXECUTE FUNCTION public.force_single_tree_coin();

DROP TRIGGER IF EXISTS trg_force_single_tree_coin_upd ON public.tree_posts;
CREATE TRIGGER trg_force_single_tree_coin_upd
BEFORE UPDATE ON public.tree_posts
FOR EACH ROW
EXECUTE FUNCTION public.force_single_tree_coin();
