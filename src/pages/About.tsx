import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-6">About GreenSnap</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We aim to raise awareness about deforestation, urbanization, and pollution by encouraging
            tree plantation and sustainable practices.
          </p>
          <p>
            GreenSnap connects individuals and communities to take real actions toward a greener future—
            from planting trees to sharing stories that inspire others to do the same.
          </p>
          <p className="text-foreground font-medium">
            Join us in creating a sustainable future.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;


