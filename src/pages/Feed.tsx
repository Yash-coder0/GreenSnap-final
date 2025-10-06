import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import TreeCard from "@/components/TreeCard";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TreePost {
  id: string;
  image_url: string;
  description: string | null;
  location: string | null;
  tree_count: number;
  coins_earned: number;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
}

const Feed = () => {
  const [posts, setPosts] = useState<TreePost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      loadPosts();
    });

    // Listen for new posts
    const channel = supabase
      .channel("tree_posts_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tree_posts",
        },
        () => {
          loadPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("tree_posts")
        .select(
          `
          *,
          profiles (
            username,
            avatar_url
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Community Feed</h1>
          <p className="text-muted-foreground">See what the community has been planting</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No trees planted yet. Be the first!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <TreeCard
                key={post.id}
                imageUrl={post.image_url}
                username={post.profiles.username}
                userAvatar={post.profiles.avatar_url || undefined}
                description={post.description || undefined}
                location={post.location || undefined}
                treeCount={post.tree_count}
                coinsEarned={post.coins_earned}
                createdAt={post.created_at}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Feed;