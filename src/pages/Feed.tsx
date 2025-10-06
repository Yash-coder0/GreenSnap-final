import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import TreeCard from "@/components/TreeCard";
import { Button } from "@/components/ui/button";
import { Loader2, SlidersHorizontal } from "lucide-react";
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
  const [sortBy, setSortBy] = useState<"recent" | "trees" | "coins">("recent");
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
      let query = supabase
        .from("tree_posts")
        .select(
          `
          *,
          profiles (
            username,
            avatar_url
          )
        `
        );

      // Apply sorting
      if (sortBy === "recent") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "trees") {
        query = query.order("tree_count", { ascending: false });
      } else if (sortBy === "coins") {
        query = query.order("coins_earned", { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      loadPosts();
    }
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Community Feed</h1>
            <p className="text-muted-foreground">See what the community has been planting</p>
          </div>
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
            <div className="flex gap-2">
              <Button 
                variant={sortBy === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("recent")}
              >
                Recent
              </Button>
              <Button 
                variant={sortBy === "trees" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("trees")}
              >
                Most Trees
              </Button>
              <Button 
                variant={sortBy === "coins" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("coins")}
              >
                Most Coins
              </Button>
            </div>
          </div>
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