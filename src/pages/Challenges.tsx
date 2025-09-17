import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Target, 
  Upload, 
  CheckCircle, 
  Clock, 
  Leaf, 
  Recycle, 
  Lightbulb, 
  TreePine,
  Camera,
  Award,
  Plus
} from "lucide-react";
import { useChallenge } from "@/contexts/ChallengeContext";
import { useUser } from "@/contexts/UserContext";

const Challenges = () => {
  const { challenges } = useChallenge();
  const { completeChallenge: userCompleteChallenge } = useUser();
  const [selectedTab, setSelectedTab] = useState("active");
  const [uploadingProof, setUploadingProof] = useState<number | null>(null);

  const filteredChallenges = challenges.filter(challenge => {
    if (selectedTab === "active") return challenge.status === "active";
    if (selectedTab === "completed") return challenge.status === "completed";
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressPercentage = (challenge: any) => {
    if (challenge.totalDays) {
      return (challenge.progress / challenge.totalDays) * 100;
    }
    return challenge.progress;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Eco Challenges 🎯
          </h1>
          <p className="text-muted-foreground text-lg">
            Take action for the environment and earn rewards!
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/challenge-management">
            <Plus className="h-4 w-4" />
            Manage Challenges
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex gap-2">
            {[
              { id: "active", name: "Active Challenges", count: challenges.filter(c => c.status === "active").length },
              { id: "completed", name: "Completed", count: challenges.filter(c => c.status === "completed").length },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? "default" : "outline"}
                onClick={() => setSelectedTab(tab.id)}
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                {tab.name}
                  <Badge variant="secondary">
                    {tab.count}
                  </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenges Grid */}
      {filteredChallenges.length === 0 ? (
        <Card className="glass">
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No challenges available</h3>
            <p className="text-muted-foreground mb-4">
              Create your first challenge to get started
            </p>
            <Button asChild className="gap-2">
              <Link to="/challenge-management">
                <Plus className="h-4 w-4" />
                Create Your First Challenge
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge, index) => (
          <Card 
            key={challenge.id} 
            className="glass card-hover animate-slide-in-up relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {challenge.status === "completed" && (
              <div className="absolute top-4 right-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            )}
            
            <CardHeader className="space-y-4">
              <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <TreePine className="h-6 w-6 text-primary" />
                  </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {challenge.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline">{challenge.category}</Badge>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
                <Badge variant="outline">+{challenge.xp} XP</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress for active challenges */}
              {challenge.status === "active" && challenge.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{challenge.progress}{challenge.totalDays ? `/${challenge.totalDays} days` : "%"}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(challenge)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Completion info for completed challenges */}
              {challenge.status === "completed" && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Completed with {challenge.score}% success rate
                  </span>
                </div>
              )}

              {/* Deadline for active challenges */}
              {challenge.status === "active" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                </div>
              )}

              {/* Requirements */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Requirements:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {challenge.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              {challenge.status === "active" && (
                <div className="space-y-3">
                  {uploadingProof === challenge.id ? (
                    <div className="space-y-3 p-4 border-2 border-dashed border-primary/20 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor={`photo-${challenge.id}`}>Upload Photo Evidence</Label>
                        <Input
                          id={`photo-${challenge.id}`}
                          type="file"
                          accept="image/*"
                          className="cursor-pointer"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`notes-${challenge.id}`}>Progress Notes</Label>
                        <Textarea
                          id={`notes-${challenge.id}`}
                          placeholder="Describe your progress and what you accomplished..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Submit Progress
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setUploadingProof(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => setUploadingProof(challenge.id)}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Progress
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Challenge Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">{challenges.filter(c => c.status === 'completed').length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-accent">{challenges.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-warning">{challenges.reduce((sum, c) => c.status === 'completed' ? sum + c.xp : sum, 0)}</p>
              <p className="text-sm text-muted-foreground">XP Earned</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-secondary">
                {challenges.filter(c => c.status === 'completed').length > 0 
                  ? Math.round((challenges.filter(c => c.status === 'completed').length / challenges.length) * 100)
                  : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenges;