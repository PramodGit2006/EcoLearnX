import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Calendar } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Leaderboard = () => {
  const { userStats } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedScope, setSelectedScope] = useState("class");

  const periods = [
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "all", name: "All Time" },
  ];

  const scopes = [
    { id: "class", name: "My Class" },
    { id: "school", name: "School" },
    { id: "global", name: "Global" },
  ];

  // Generate leaderboard with current user if they have activity
  const leaderboardData = userStats.totalPoints > 0 ? [
    {
      rank: userStats.rank,
      name: userStats.name,
      points: userStats.totalPoints,
      level: userStats.level,
      badge: userStats.level >= 10 ? "Eco Master" : userStats.level >= 5 ? "Nature Guardian" : "Green Student",
      weeklyGain: "+120", // This would be calculated based on recent activity
      streak: userStats.streak,
      quizzes: userStats.quizzesCompleted,
      challenges: userStats.challengesCompleted,
      isCurrentUser: true,
    }
  ] : [];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return "bg-primary/10 border-primary/30";
    if (rank === 1) return "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20";
    if (rank === 2) return "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20";
    if (rank === 3) return "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20";
    return "";
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Leaderboard 🏆
        </h1>
        <p className="text-muted-foreground text-lg">
          See how you rank among eco-warriors!
        </p>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <div className="flex gap-2">
                {periods.map((period) => (
                  <Button
                    key={period.id}
                    variant={selectedPeriod === period.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.id)}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    {period.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Scope</label>
              <div className="flex gap-2">
                {scopes.map((scope) => (
                  <Button
                    key={scope.id}
                    variant={selectedScope === scope.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedScope(scope.id)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    {scope.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      {leaderboardData.length > 0 ? (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="text-center">
              <div 
                className={`space-y-4 p-6 rounded-xl ${getRankBg(leaderboardData[0].rank, leaderboardData[0].isCurrentUser)} card-hover animate-slide-in-up`}
              >
                <div className="flex justify-center">
                  {getRankIcon(leaderboardData[0].rank)}
                </div>
                
                <Avatar className="h-16 w-16 mx-auto ring-4 ring-primary/20">
                  <AvatarFallback>{leaderboardData[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-bold text-lg">{leaderboardData[0].name}</h3>
                  <Badge variant="outline" className="mt-1">{leaderboardData[0].badge}</Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">{leaderboardData[0].points.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Level {leaderboardData[0].level}</p>
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs">{leaderboardData[0].weeklyGain}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass">
          <CardContent className="text-center py-12">
            <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Rankings Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start taking quizzes and completing challenges to appear on the leaderboard!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Full Leaderboard */}
      {leaderboardData.length > 0 ? (
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {leaderboardData.map((user, index) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                    user.isCurrentUser ? 'bg-primary/5 border-l-4 border-primary' : ''
                  } animate-slide-in-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{user.name}</p>
                      {user.isCurrentUser && (
                        <Badge variant="default" className="text-xs">You</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.badge}</p>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium">{user.quizzes}</p>
                      <p className="text-muted-foreground">Quizzes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{user.challenges}</p>
                      <p className="text-muted-foreground">Challenges</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{user.streak}</p>
                      <p className="text-muted-foreground">Streak</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">{user.points.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">{user.weeklyGain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Performance Stats */}
      {leaderboardData.length > 0 && (
        <Card className="glass">
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">#{userStats.rank}</p>
                <p className="text-sm text-muted-foreground">Current Rank</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-accent">{userStats.totalPoints}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-warning">{userStats.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-secondary">{userStats.level}</p>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Leaderboard;