import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/gamified/Badge";
import { XPBar } from "@/components/gamified/XPBar";
import { ProgressRing } from "@/components/gamified/ProgressRing";
import { Button } from "@/components/ui/button";
import { EnvironmentalBulletins } from "@/components/EnvironmentalBulletins";
import { Trophy, Target, BookOpen, Award, TrendingUp, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Dashboard = () => {
  const { userStats } = useUser();

  const recentBadges = [
    { type: "gold", title: "Quiz Master", description: "Complete 20 quizzes", earned: userStats.quizzesCompleted >= 20 },
    { type: "silver", title: "Eco Warrior", description: "Finish 10 challenges", earned: userStats.challengesCompleted >= 10 },
    { type: "bronze", title: "First Steps", description: "Complete first quiz", earned: userStats.quizzesCompleted >= 1 },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome back, {userStats.name}! 🌱
        </h1>
        <p className="text-muted-foreground">Ready to continue your eco-learning journey?</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass p-4 text-center card-hover">
          <div className="space-y-2">
            <Trophy className="h-8 w-8 mx-auto text-xp-gold" />
            <p className="text-2xl font-bold text-foreground">{userStats.level}</p>
            <p className="text-sm text-muted-foreground">Level</p>
          </div>
        </Card>
        
        <Card className="glass p-4 text-center card-hover">
          <div className="space-y-2">
            <TrendingUp className="h-8 w-8 mx-auto text-primary" />
            <p className="text-2xl font-bold text-foreground">{userStats.totalPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
        </Card>
        
        <Card className="glass p-4 text-center card-hover">
          <div className="space-y-2">
            <Target className="h-8 w-8 mx-auto text-accent" />
            <p className="text-2xl font-bold text-foreground">{userStats.rank > 0 ? `#${userStats.rank}` : 'Unranked'}</p>
            <p className="text-sm text-muted-foreground">Rank</p>
          </div>
        </Card>
        
        <Card className="glass p-4 text-center card-hover">
          <div className="space-y-2">
            <Zap className="h-8 w-8 mx-auto text-warning" />
            <p className="text-2xl font-bold text-foreground">{userStats.streak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Environmental News Bulletins */}
          <EnvironmentalBulletins />
          
          {/* XP Progress */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <XPBar
                currentXP={userStats.currentXP}
                maxXP={userStats.maxXP}
                level={userStats.level}
              />
            </CardContent>
          </Card>

          {/* Activity Progress */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Activity Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center space-y-4">
                  <ProgressRing progress={userStats.quizzesCompleted > 0 ? Math.min((userStats.quizzesCompleted / 25) * 100, 100) : 0}>
                    <div className="text-center">
                      <p className="text-lg font-bold">{userStats.quizzesCompleted}</p>
                      <p className="text-xs text-muted-foreground">Quizzes</p>
                    </div>
                  </ProgressRing>
                  <p className="text-sm text-muted-foreground">Quiz Completion</p>
                </div>
                
                <div className="text-center space-y-4">
                  <ProgressRing progress={userStats.challengesCompleted > 0 ? Math.min((userStats.challengesCompleted / 20) * 100, 100) : 0}>
                    <div className="text-center">
                      <p className="text-lg font-bold">{userStats.challengesCompleted}</p>
                      <p className="text-xs text-muted-foreground">Challenges</p>
                    </div>
                  </ProgressRing>
                  <p className="text-sm text-muted-foreground">Challenge Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild className="h-auto p-4 flex-col space-y-2">
                  <Link to="/quiz/1">
                    <BookOpen className="h-6 w-6" />
                    <span>Take Quiz</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Link to="/challenges">
                    <Target className="h-6 w-6" />
                    <span>New Challenge</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Badges & Achievements */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Recent Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBadges.map((badge, index) => (
                  <Badge
                    key={badge.title}
                    type={badge.type}
                    title={badge.title}
                    description={badge.description}
                    earned={badge.earned}
                    className="w-full"
                  />
                ))}
                
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/rewards">View All Badges</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Quizzes completed</span>
                <span className="font-bold">{userStats.quizzesCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Challenges finished</span>
                <span className="font-bold">{userStats.challengesCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Current XP</span>
                <span className="font-bold text-primary">{userStats.currentXP}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Streak maintained</span>
                <span className="font-bold text-accent">{userStats.streak} days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;