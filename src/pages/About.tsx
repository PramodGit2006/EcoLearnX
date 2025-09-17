import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Target, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Heart,
  Lightbulb,
  TreePine,
  Recycle
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Quizzes",
      description: "Test your environmental knowledge with engaging, gamified quizzes across various topics like climate change, renewable energy, and conservation.",
    },
    {
      icon: Target,
      title: "Real-World Challenges",
      description: "Complete hands-on environmental challenges that make a real difference in your community, from tree planting to energy audits.",
    },
    {
      icon: Award,
      title: "Badges & Rewards",
      description: "Earn badges, certificates, and achievements as you progress through your eco-learning journey and unlock new milestones.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with classmates, compete on leaderboards, and participate in group challenges to make learning social and fun.",
    },
  ];

  const impacts = [
    {
      icon: TreePine,
      stat: "10,000+",
      label: "Trees Planted",
      description: "Through our community challenges",
    },
    {
      icon: Recycle,
      stat: "50 tons",
      label: "Waste Recycled",
      description: "By our active users",
    },
    {
      icon: Lightbulb,
      stat: "25%",
      label: "Energy Saved",
      description: "Average reduction in participating schools",
    },
    {
      icon: Globe,
      stat: "500+",
      label: "Schools Joined",
      description: "Across 30 countries worldwide",
    },
  ];

  const team = [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center text-white space-y-8">
          <div className="animate-slide-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About EcoLearn Play
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Transforming environmental education through gamification, making sustainability learning 
              engaging, effective, and fun for students worldwide.
            </p>
          </div>
          
          <div className="flex justify-center animate-pulse-gentle">
            <Leaf className="h-16 w-16 text-green-300" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            
            <Card className="glass p-8 animate-slide-in-up">
              <p className="text-lg leading-relaxed">
                We believe that environmental education should be as engaging as it is important. 
                EcoLearn Play combines the power of gamification with scientifically-backed environmental 
                content to create an immersive learning experience that inspires action and builds 
                lasting eco-consciousness in students.
              </p>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="glass p-6 text-center card-hover animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
                <Leaf className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Educate</h3>
                <p className="text-muted-foreground">
                  Provide comprehensive, scientifically accurate environmental education
                </p>
              </Card>
              
              <Card className="glass p-6 text-center card-hover animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
                <Heart className="h-12 w-12 mx-auto text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Engage</h3>
                <p className="text-muted-foreground">
                  Make learning fun and interactive through gamified experiences
                </p>
              </Card>
              
              <Card className="glass p-6 text-center card-hover animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
                <Target className="h-12 w-12 mx-auto text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Empower</h3>
                <p className="text-muted-foreground">
                  Inspire students to take real-world environmental action
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the tools and features that make environmental learning exciting and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="glass p-6 card-hover animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Environmental Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real results from our community of eco-warriors making a difference worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((impact, index) => (
              <Card key={impact.label} className="glass p-6 text-center card-hover animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                    <impact.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">{impact.stat}</p>
                    <p className="font-semibold">{impact.label}</p>
                    <p className="text-sm text-muted-foreground">{impact.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Together we can create a more sustainable future through education and action
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass p-8 animate-slide-in-up">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Be Part of the Change</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform is built by educators, scientists, and technologists who share a passion for 
                    environmental education. Join our growing community of eco-warriors making a real difference 
                    in the world through knowledge, action, and collaboration.
                  </p>
                </div>
                <Button asChild size="lg" className="px-8">
                  <Link to="/dashboard">Start Your Journey</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 eco-gradient">
        <div className="container mx-auto px-4 text-center text-white space-y-8">
          <div className="animate-slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Eco Journey?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of students already making a difference through gamified environmental education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                <Link to="/dashboard">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                <Link to="/quizzes">Try a Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;