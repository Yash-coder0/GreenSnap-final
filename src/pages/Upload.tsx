import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
      }
    });
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const calculateCoins = (treeCount: number): number => {
    // Simple calculation: 10 coins per tree, with quality bonus
    const baseCoins = treeCount * 10;
    const qualityBonus = Math.floor(Math.random() * 20) + 10; // Random 10-30 bonus
    return baseCoins + qualityBonus;
  };

  const estimateTreeCount = (): number => {
    // Mock tree detection - in real app, use AI/ML
    return Math.floor(Math.random() * 5) + 1; // Random 1-5 trees
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !userId) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload image to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("tree-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("tree-images").getPublicUrl(fileName);

      // Calculate rewards
      const treeCount = estimateTreeCount();
      const coinsEarned = calculateCoins(treeCount);

      // Create post
      const { error: postError } = await supabase.from("tree_posts").insert({
        user_id: userId,
        image_url: publicUrl,
        description: description.trim() || null,
        location: location.trim() || null,
        tree_count: treeCount,
        coins_earned: coinsEarned,
      });

      if (postError) throw postError;

      toast({
        title: "Success! 🌳",
        description: `You've earned ${coinsEarned} coins for planting ${treeCount} tree${
          treeCount > 1 ? "s" : ""
        }!`,
      });

      navigate("/feed");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Upload Your Tree</CardTitle>
            <CardDescription>
              Share your tree planting contribution and earn coins!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleUpload} className="space-y-6">
              {/* File Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Tree Photo *</label>
                {preview ? (
                  <div className="relative rounded-lg overflow-hidden border-2 border-primary">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setFile(null);
                        setPreview("");
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload tree image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your tree planting experience..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload & Earn Coins
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Upload;