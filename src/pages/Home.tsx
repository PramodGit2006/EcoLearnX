import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Trophy, BookOpen, Target, Users, Award } from "lucide-react";
import heroImage from "@/assets/eco-hero.jpg";

const Home = () => {
  const quickActions = [
    {
      title: "Take a Quiz",
      description: "Test your eco-knowledge",
      icon: BookOpen,
      link: "/quizzes",
      color: "primary",
    },
    {
      title: "Join Challenge",
      description: "Complete eco-tasks",
      icon: Target,
      link: "/challenges", 
      color: "accent",
    },
    {
      title: "View Progress",
      description: "Check your dashboard",
      icon: Trophy,
      link: "/dashboard",
      color: "secondary",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        
        <div className="relative z-10 text-center text-white space-y-8 animate-slide-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              Start Your{" "}
              <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent animate-glow">
                Eco Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Join the gamified environmental education platform that makes learning about sustainability fun and rewarding!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Leaf className="h-8 w-8 text-green-300 opacity-60" />
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-4 h-4 bg-blue-300 rounded-full opacity-40" />
        </div>
        <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-6 h-6 bg-green-400 rounded-full opacity-30" />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Jump right into your eco-learning adventure with these popular activities
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <Card key={action.title} className="glass p-6 card-hover animate-slide-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <Link to={action.link} className="block text-center space-y-4">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-${action.color}/10 flex items-center justify-center`}>
                    <action.icon className={`h-8 w-8 text-${action.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{action.title}</h3>
                  <p className="text-muted-foreground">{action.description}</p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why EcoLearn Play?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience gamified learning that makes environmental education engaging and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Community Learning",
                description: "Connect with classmates and compete on leaderboards",
              },
              {
                icon: Award,
                title: "Earn Rewards",
                description: "Unlock badges, certificates and achievements",
              },
              {
                icon: Target,
                title: "Real-World Impact",
                description: "Complete challenges that make a difference",
              },
            ].map((feature, index) => (
              <Card key={feature.title} className="p-6 text-center space-y-4 card-hover animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;