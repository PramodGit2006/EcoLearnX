import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Star, Play, CheckCircle, Plus } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";

const Quizzes = () => {
  const { quizzes } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Calculate category counts dynamically
  const categories = [
    { id: "all", name: "All Quizzes", count: quizzes.length },
    { id: "climate", name: "Climate Change", count: quizzes.filter(q => q.category === "climate").length },
    { id: "energy", name: "Renewable Energy", count: quizzes.filter(q => q.category === "energy").length },
    { id: "wildlife", name: "Wildlife Conservation", count: quizzes.filter(q => q.category === "wildlife").length },
    { id: "pollution", name: "Pollution Control", count: quizzes.filter(q => q.category === "pollution").length },
  ];

  const filteredQuizzes = selectedCategory === "all" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Eco Quizzes 🧠
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your environmental knowledge and earn XP points!
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/quiz-management">
            <Plus className="h-4 w-4" />
            Manage Quizzes
          </Link>
        </Button>
      </div>

      {/* Category Filter */}
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
                <BookOpen className="h-4 w-4" />
                {category.name}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Grid */}
      {filteredQuizzes.length === 0 ? (
        <Card className="glass">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No quizzes available</h3>
            <p className="text-muted-foreground mb-4">
              Create your first quiz to get started with the platform
            </p>
            <Button asChild className="gap-2">
              <Link to="/quiz-management">
                <Plus className="h-4 w-4" />
                Create Your First Quiz
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredQuizzes.map((quiz, index) => (
                  <Card 
                    key={quiz.id} 
                    className="glass card-hover animate-slide-in-up relative overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {quiz.completed && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                    )}
                    
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">{quiz.title}</CardTitle>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {quiz.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                        <Badge variant="outline">+{quiz.xp} XP</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {quiz.questions.length} questions
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {quiz.duration}
                        </div>
                      </div>
                      
                      {quiz.completed && quiz.score && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <Star className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-400">
                            Completed: {quiz.score}% score
                          </span>
                        </div>
                      )}
                      
                      <Button 
                        asChild
                        className="w-full" 
                        variant={quiz.completed ? "outline" : "default"}
                      >
                        <Link to={`/quiz/${quiz.id}`}>
                          <Play className="h-4 w-4 mr-2" />
                          {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
            ))}
        </div>
      )}

      {/* Stats Summary */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Your Quiz Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-accent">87%</p>
              <p className="text-sm text-muted-foreground">Avg Score</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-warning">1,450</p>
              <p className="text-sm text-muted-foreground">XP Earned</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-secondary">5</p>
              <p className="text-sm text-muted-foreground">Streak Days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quizzes;