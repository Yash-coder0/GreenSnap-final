import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Leaf, Upload, Users, Coins, Trees, Heart, ChevronDown, Globe, Award, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useState } from "react";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-border rounded-lg">
      <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-left text-foreground">{question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 text-muted-foreground">
        {answer}
      </CollapsibleContent>
    </Collapsible>
  );
};

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

      {/* Interactive Info Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Learn More About TreePlanter
          </h2>
          
          <Tabs defaultValue="impact" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="impact" className="text-base">
                <Globe className="mr-2 h-4 w-4" />
                Impact
              </TabsTrigger>
              <TabsTrigger value="rewards" className="text-base">
                <Award className="mr-2 h-4 w-4" />
                Rewards
              </TabsTrigger>
              <TabsTrigger value="tips" className="text-base">
                <TrendingUp className="mr-2 h-4 w-4" />
                Tips
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="impact" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Environmental Impact</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">🌍 Carbon Sequestration</p>
                      <p>A single mature tree can absorb up to 48 pounds of CO2 per year, helping combat climate change.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">💧 Water Conservation</p>
                      <p>Trees help regulate water cycles and prevent soil erosion, protecting watersheds and aquifers.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">🦋 Biodiversity</p>
                      <p>Trees provide habitat for thousands of species, supporting ecosystem health and resilience.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">🌡️ Temperature Regulation</p>
                      <p>Urban trees can reduce local temperatures by up to 10°F through shade and evapotranspiration.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rewards" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">How Rewards Work</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">🪙 Base Coins</p>
                      <p>Earn 10 coins for every tree you plant and verify through our platform.</p>
                    </div>
                    <div className="p-4 bg-secondary/10 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">⭐ Quality Bonus</p>
                      <p>Receive up to 30 bonus coins based on photo quality, location diversity, and tree health.</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">🏆 Achievement System</p>
                      <p>Complete milestones like "First 10 Trees" or "5 Different Locations" for extra rewards!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tips" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Tree Planting Tips</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="p-3 border-l-4 border-primary">
                      <p className="font-semibold text-foreground">Choose Native Species</p>
                      <p className="text-sm">Native trees are adapted to local conditions and support local ecosystems better.</p>
                    </div>
                    <div className="p-3 border-l-4 border-secondary">
                      <p className="font-semibold text-foreground">Consider Location Carefully</p>
                      <p className="text-sm">Plant away from power lines, buildings, and ensure adequate space for growth.</p>
                    </div>
                    <div className="p-3 border-l-4 border-accent">
                      <p className="font-semibold text-foreground">Water Regularly</p>
                      <p className="text-sm">Young trees need consistent watering, especially in their first 2-3 years.</p>
                    </div>
                    <div className="p-3 border-l-4 border-primary">
                      <p className="font-semibold text-foreground">Mulch Around the Base</p>
                      <p className="text-sm">Mulch helps retain moisture and regulate soil temperature for healthier growth.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <FAQItem 
              question="How do I earn coins?"
              answer="Upload photos of trees you've planted, and our system will automatically calculate your coin rewards based on the number of trees and photo quality. You'll earn a base of 10 coins per tree plus quality bonuses!"
            />
            <FAQItem 
              question="What can I do with my coins?"
              answer="Coins represent your contribution to the environment! While this is a demonstration platform, in a full implementation, coins could be exchanged for rewards, donated to environmental causes, or used to track your impact."
            />
            <FAQItem 
              question="How are trees verified?"
              answer="Our system uses photo analysis to count trees and assess planting quality. For this demo, we use a simplified algorithm. In production, this would involve AI-powered image recognition and potentially community verification."
            />
            <FAQItem 
              question="Can I see what others are planting?"
              answer="Yes! Visit the Community Feed to see tree-planting posts from the entire community. It's a great way to get inspired and see the collective impact we're making."
            />
            <FAQItem 
              question="Is my location data private?"
              answer="Absolutely! While you can optionally share general location information (like city or region) with your posts, your exact planting locations remain private unless you choose to share them."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of tree planters and start tracking your environmental impact today!
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
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
