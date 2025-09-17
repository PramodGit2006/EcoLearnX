import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Clock, Trophy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuiz } from "@/contexts/QuizContext";
import { useUser } from "@/contexts/UserContext";

const QuizTaking = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getQuizById, completeQuiz } = useQuiz();
  const { completeQuiz: userCompleteQuiz } = useUser();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = getQuizById(parseInt(quizId || '0'));

  // Redirect if quiz not found
  useEffect(() => {
    if (!quiz) {
      toast({
        title: "Quiz not found",
        description: "The requested quiz does not exist.",
        variant: "destructive"
      });
      navigate('/quizzes');
    } else {
      setTimeLeft(quiz.timeLimit || 300);
    }
  }, [quiz, navigate, toast]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizSubmit();
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuizSubmit = () => {
    if (!quiz) return;
    
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);
    
    // Update quiz completion status and user stats
    completeQuiz(quiz.id, finalScore);
    userCompleteQuiz(quiz.xp);
    
    // Show completion toast with confetti effect
    toast({
      title: "Quiz Completed! 🎉",
      description: `You scored ${finalScore}% and earned ${quiz.xp} XP!`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Early return if quiz not found
  if (!quiz) {
    return null;
  }

  const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion);
  const currentQ = quiz.questions[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="glass max-w-2xl mx-auto">
          <CardContent className="p-8 text-center space-y-6">
            <div className="animate-slide-in-up">
              <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-muted-foreground">Great job on finishing the quiz!</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{score}%</p>
                <p className="text-sm text-muted-foreground">Final Score</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-2xl font-bold text-accent">+{quiz.xp}</p>
                <p className="text-sm text-muted-foreground">XP Earned</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Results:</h3>
              <div className="space-y-2 text-left">
                {quiz.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  return (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm">Question {index + 1}</span>
                      {!isCorrect && (
                        <span className="text-xs text-muted-foreground ml-auto">
                          Correct: {question.options[question.correctAnswer]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={() => navigate("/quizzes")} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate("/quizzes")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
          <Badge variant="outline">+{quiz.xp} XP</Badge>
        </div>
      </div>

      {/* Progress */}
      <Card className="glass mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{quiz.title}</span>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {quiz.questions.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="glass animate-slide-in-up">
        <CardHeader>
          <CardTitle className="text-xl">
            Question {currentQuestion + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{currentQ.question}</p>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentQuestion === quiz.questions.length - 1 ? (
                <Button
                  onClick={handleQuizSubmit}
                  disabled={!isAnswered}
                  className="px-8"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!isAnswered}
                >
                  Next Question
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizTaking;