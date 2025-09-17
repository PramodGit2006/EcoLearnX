import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge as GameBadge } from "@/components/gamified/Badge";
import { Progress } from "@/components/ui/progress";
import { Award, Gift, Star, Crown, Shield, Gem, Zap, Heart } from "lucide-react";

const Rewards = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Rewards" },
    { id: "badges", name: "Badges" },
    { id: "certificates", name: "Certificates" },
    { id: "achievements", name: "Achievements" },
  ];

  const badges = [
    {
      id: 1,
      type: "gold" as const,
      title: "Quiz Master",
      description: "Complete 20 quizzes with 80%+ score",
      icon: "🧠",
      earned: true,
      category: "badges",
      earnedDate: "2024-02-15",
      rarity: "Epic",
    },
    {
      id: 2,
      type: "silver" as const, 
      title: "Eco Warrior",
      description: "Complete 10 environmental challenges",
      icon: "⚔️",
      earned: true,
      category: "badges",
      earnedDate: "2024-02-20",
      rarity: "Rare",
    },
    {
      id: 3,
      type: "bronze" as const,
      title: "First Steps",
      description: "Complete your first quiz",
      icon: "👣",
      earned: true,
      category: "badges",
      earnedDate: "2024-01-15",
      rarity: "Common",
    },
  ];

  const certificates = [
    {
      id: 7,
      title: "Climate Science Fundamentals",
      description: "Complete the climate change learning path",
      icon: "📜",
      earned: true,
      category: "certificates",
      earnedDate: "2024-02-25",
    },
  ];

  const allRewards = [...badges, ...certificates];
  const filteredRewards = selectedCategory === "all" 
    ? allRewards 
    : allRewards.filter(reward => reward.category === selectedCategory);

  const earnedCount = allRewards.filter(r => r.earned).length;
  const totalCount = allRewards.length;
  const completionPercentage = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Rewards & Achievements 🏆
        </h1>
        <p className="text-muted-foreground text-lg">
          Celebrate your eco-learning journey!
        </p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Collection Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-sm text-muted-foreground">{earnedCount}/{totalCount}</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          <p className="text-center text-sm text-muted-foreground">
            {completionPercentage}% complete - Keep going! 🌟
          </p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.id === "badges" && <Award className="h-4 w-4" />}
                {category.id === "certificates" && <Gift className="h-4 w-4" />}
                {category.id === "achievements" && <Star className="h-4 w-4" />}
                {category.id === "all" && <Crown className="h-4 w-4" />}
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward, index) => (
          <div key={reward.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            {reward.category === "badges" && "type" in reward ? (
              <GameBadge
                type={reward.type as "bronze" | "silver" | "gold" | "diamond"}
                title={reward.title}
                description={reward.description}
                icon={reward.icon}
                earned={reward.earned}
                className="w-full h-full"
              />
            ) : (
              <Card className={`glass card-hover transition-all duration-300 h-full ${
                reward.earned ? "opacity-100" : "opacity-50 grayscale"
              }`}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-4xl">{reward.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {reward.description}
                    </p>
                  </div>
                  {reward.earned && (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;