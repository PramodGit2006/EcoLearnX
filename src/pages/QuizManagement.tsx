import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { QuizCreator } from '@/components/QuizCreator';
import { useQuiz } from '@/contexts/QuizContext';
import { Plus, Edit, Trash2, BookOpen, Clock, Star, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuizManagement = () => {
  const { quizzes, deleteQuiz } = useQuiz();
  const { toast } = useToast();
  const [showCreator, setShowCreator] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteQuiz = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteQuiz(id);
      toast({
        title: "Quiz Deleted",
        description: `"${title}" has been removed successfully.`
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quiz Management
          </h1>
          <p className="text-muted-foreground mt-2">Create and manage educational quizzes</p>
        </div>
        <Button onClick={() => setShowCreator(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes by title, description, or category..."
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
          <p className="text-2xl font-bold text-primary">{quizzes.length}</p>
          <p className="text-sm text-muted-foreground">Total Quizzes</p>
        </Card>
        <Card className="glass text-center p-4">
          <p className="text-2xl font-bold text-accent">
            {quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total Questions</p>
        </Card>
        <Card className="glass text-center p-4">
          <p className="text-2xl font-bold text-warning">
            {quizzes.filter(quiz => quiz.completed).length}
          </p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </Card>
        <Card className="glass text-center p-4">
          <p className="text-2xl font-bold text-secondary">
            {quizzes.reduce((sum, quiz) => sum + quiz.xp, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total XP</p>
        </Card>
      </div>

      {/* Quiz List */}
      {filteredQuizzes.length === 0 ? (
        <Card className="glass">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {quizzes.length === 0 ? 'No quizzes yet' : 'No quizzes match your search'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {quizzes.length === 0 
                ? 'Create your first quiz to get started with the platform'
                : 'Try adjusting your search terms or create a new quiz'
              }
            </p>
            <Button onClick={() => setShowCreator(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz, index) => (
            <Card 
              key={quiz.id} 
              className="glass card-hover animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{quiz.title}</CardTitle>
                  <div className="flex gap-2 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingQuiz(quiz);
                        setShowCreator(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {quiz.description}
                </p>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {quiz.category}
                  </Badge>
                  <Badge variant="outline">+{quiz.xp} XP</Badge>
                  {quiz.completed && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      ✓ {quiz.score}%
                    </Badge>
                  )}
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
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setEditingQuiz(quiz);
                      setShowCreator(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quiz Creator Modal */}
      {showCreator && (
        <QuizCreator
          onClose={() => {
            setShowCreator(false);
            setEditingQuiz(null);
          }}
          editQuiz={editingQuiz}
        />
      )}
    </div>
  );
};

export default QuizManagement;