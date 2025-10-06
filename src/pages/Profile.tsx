import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import TreeCard from "@/components/TreeCard";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Coins, Trees, Loader2 } from "lucide-react";

interface Profile {
  username: string;
  avatar_url: string | null;
  total_coins: number;
  trees_planted: number;
}

interface TreePost {
  id: string;
  image_url: string;
  description: string | null;
  location: string | null;
  tree_count: number;
  coins_earned: number;
  created_at: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<TreePost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        loadProfile(session.user.id);
        loadUserPosts(session.user.id);
      }
    });
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserPosts = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("tree_posts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-secondary text-foreground text-3xl">
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {profile.username}
                </h1>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                  <Badge variant="secondary" className="px-4 py-2 text-base">
                    <Coins className="h-5 w-5 mr-2" />
                    {profile.total_coins} Coins
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-base">
                    <Trees className="h-5 w-5 mr-2" />
                    {profile.trees_planted} Trees Planted
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-base">
                    {posts.length} Posts
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Posts */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Contributions</h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              You haven't planted any trees yet!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <TreeCard
                key={post.id}
                imageUrl={post.image_url}
                username={profile.username}
                userAvatar={profile.avatar_url || undefined}
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

export default Profile;