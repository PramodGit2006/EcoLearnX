import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChallengeCreator } from '@/components/ChallengeCreator';
import { useChallenge } from '@/contexts/ChallengeContext';
import { Plus, Edit, Trash2, Target, Clock, Search, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChallengeManagement = () => {
  const { challenges, deleteChallenge } = useChallenge();
  const { toast } = useToast();
  const [showCreator, setShowCreator] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    challenge.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteChallenge = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteChallenge(id);
      toast({
        title: "Challenge Deleted",
        description: `"${title}" has been removed successfully.`
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Challenge Management
          </h1>
          <p className="text-muted-foreground mt-2">Create and manage environmental challenges</p>
        </div>
        <Button onClick={() => setShowCreator(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Challenge
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass text-center p-4">
          <p className="text-2xl font-bold text-primary">{challenges.length}</p>
          <p className="text-sm text-muted-foreground">Total Challenges</p>
        </Card>
        <Card className="glass text-center p-4">
          <p className="text-2xl font-bold text-accent">
            {challenges.filter(c => c.status === 'active').length}
          </p>
          <p className="text-sm text-muted-foreground">Active</p>
        </Card>
        <Card className="glass text-center p-4">
          <p className="text-2xl font-bold text-warning">
            {challenges.filter(c => c.status === 'completed').length}
          </p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </Card>
        <Card className="glass text-center p-4">
          <p className="text-2xl font-bold text-secondary">
            {challenges.reduce((sum, c) => sum + c.xp, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total XP</p>
        </Card>
      </div>

      {/* Challenge List */}
      {filteredChallenges.length === 0 ? (
        <Card className="glass">
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {challenges.length === 0 ? 'No challenges yet' : 'No challenges match your search'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {challenges.length === 0 
                ? 'Create your first challenge to get started'
                : 'Try adjusting your search terms or create a new challenge'
              }
            </p>
            <Button onClick={() => setShowCreator(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Challenge
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <Card 
              key={challenge.id} 
              className="glass card-hover animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{challenge.title}</CardTitle>
                  <div className="flex gap-2 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingChallenge(challenge);
                        setShowCreator(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteChallenge(challenge.id, challenge.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {challenge.description}
                </p>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {challenge.category}
                  </Badge>
                  <Badge variant="outline">+{challenge.xp} XP</Badge>
                  {challenge.status === 'completed' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      ✓ {challenge.score}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(challenge.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {challenge.requirements.length} reqs
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setEditingChallenge(challenge);
                      setShowCreator(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteChallenge(challenge.id, challenge.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Challenge Creator Modal */}
      {showCreator && (
        <ChallengeCreator
          onClose={() => {
            setShowCreator(false);
            setEditingChallenge(null);
          }}
          editChallenge={editingChallenge}
        />
      )}
    </div>
  );
};

export default ChallengeManagement;