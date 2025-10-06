import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Upload, Users, Coins, Trees, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: "brightness(0.4)",
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 inline-block p-4 bg-primary/20 backdrop-blur-sm rounded-full">
            <Leaf className="h-16 w-16 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Plant Trees, Earn Rewards
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            Join our global community of tree planters. Upload your tree photos and
            earn coins based on your environmental impact!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/auth">
                Get Started
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/feed">
                View Community
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Simple steps to make a difference
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-block p-4 bg-primary/10 rounded-full">
                  <Upload className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">1. Upload</h3>
                <p className="text-muted-foreground">
                  Take a photo of the trees you've planted and upload it to our
                  platform
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-block p-4 bg-secondary/20 rounded-full">
                  <Trees className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">2. Verify</h3>
                <p className="text-muted-foreground">
                  Our system analyzes your photo to count trees and assess quality
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-block p-4 bg-accent/20 rounded-full">
                  <Coins className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">3. Earn</h3>
                <p className="text-muted-foreground">
                  Receive coins based on the number and quality of trees planted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Our Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Users className="h-12 w-12 text-white mx-auto mb-2" />
              <p className="text-5xl font-bold text-white">1,000+</p>
              <p className="text-white/90 text-lg">Active Planters</p>
            </div>
            
            <div className="space-y-2">
              <Trees className="h-12 w-12 text-white mx-auto mb-2" />
              <p className="text-5xl font-bold text-white">50,000+</p>
              <p className="text-white/90 text-lg">Trees Planted</p>
            </div>
            
            <div className="space-y-2">
              <Heart className="h-12 w-12 text-white mx-auto mb-2" />
              <p className="text-5xl font-bold text-white">10+</p>
              <p className="text-white/90 text-lg">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of tree planters making our planet greener, one tree at a time.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/auth">
              <Leaf className="mr-2 h-5 w-5" />
              Start Planting Today
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">TreePlanter</span>
          </div>
          <p>Making the world greener, together.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
