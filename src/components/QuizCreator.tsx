import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { useQuiz, QuizQuestion, Quiz } from '@/contexts/QuizContext';
import { useToast } from '@/hooks/use-toast';

interface QuizCreatorProps {
  onClose: () => void;
  editQuiz?: Quiz;
}

export const QuizCreator: React.FC<QuizCreatorProps> = ({ onClose, editQuiz }) => {
  const { addQuiz, updateQuiz } = useQuiz();
  const { toast } = useToast();
  
  const [quizData, setQuizData] = useState<Omit<Quiz, 'id'>>({
    title: editQuiz?.title || '',
    description: editQuiz?.description || '',
    category: editQuiz?.category || 'climate',
    difficulty: editQuiz?.difficulty || 'Beginner',
    duration: editQuiz?.duration || '5 min',
    timeLimit: editQuiz?.timeLimit || 300,
    xp: editQuiz?.xp || 100,
    questions: editQuiz?.questions || [],
    completed: false,
  });

  const [currentQuestion, setCurrentQuestion] = useState<Partial<QuizQuestion>>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  const categories = ['climate', 'energy', 'wildlife', 'pollution'];

  const addQuestion = () => {
    if (!currentQuestion.question || currentQuestion.options?.some(opt => !opt.trim())) {
      toast({
        title: "Error",
        description: "Please fill in all question fields",
        variant: "destructive"
      });
      return;
    }

    const newQuestion: QuizQuestion = {
      id: Date.now(),
      question: currentQuestion.question!,
      options: currentQuestion.options!,
      correctAnswer: currentQuestion.correctAnswer!,
      explanation: currentQuestion.explanation || ''
    };

    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
  };

  const removeQuestion = (index: number) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const updateQuestionOption = (optionIndex: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === optionIndex ? value : opt) || []
    }));
  };

  const saveQuiz = () => {
    if (!quizData.title || !quizData.description || quizData.questions.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and add at least one question",
        variant: "destructive"
      });
      return;
    }

    if (editQuiz) {
      updateQuiz(editQuiz.id, quizData);
      toast({
        title: "Success",
        description: "Quiz updated successfully!"
      });
    } else {
      addQuiz(quizData);
      toast({
        title: "Success",
        description: "Quiz created successfully!"
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{editQuiz ? 'Edit Quiz' : 'Create New Quiz'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quiz Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title *</Label>
              <Input
                id="title"
                value={quizData.title}
                onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter quiz title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={quizData.category}
                onValueChange={(value) => setQuizData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={quizData.description}
              onChange={(e) => setQuizData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this quiz covers"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={quizData.difficulty}
                onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced') => 
                  setQuizData(prev => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={quizData.duration}
                onChange={(e) => setQuizData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 5 min"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="xp">XP Reward</Label>
              <Input
                id="xp"
                type="number"
                value={quizData.xp}
                onChange={(e) => setQuizData(prev => ({ ...prev, xp: parseInt(e.target.value) || 100 }))}
              />
            </div>
          </div>

          {/* Current Questions */}
          {quizData.questions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quiz Questions ({quizData.questions.length})</h3>
              <div className="space-y-3">
                {quizData.questions.map((question, index) => (
                  <Card key={question.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium mb-2">Q{index + 1}: {question.question}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className={`p-2 rounded ${
                              optIndex === question.correctAnswer 
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                                : 'bg-muted/50'
                            }`}>
                              {String.fromCharCode(65 + optIndex)}: {option}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Add New Question */}
          <Card className="p-4 border-dashed">
            <h3 className="text-lg font-semibold mb-4">Add New Question</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question *</Label>
                <Textarea
                  id="question"
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter your question"
                />
              </div>

              <div className="space-y-3">
                <Label>Answer Options *</Label>
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Badge variant={currentQuestion.correctAnswer === index ? "default" : "outline"}>
                      {String.fromCharCode(65 + index)}
                    </Badge>
                    <Input
                      value={option}
                      onChange={(e) => updateQuestionOption(index, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                    <Button
                      variant={currentQuestion.correctAnswer === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                    >
                      Correct
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="explanation">Explanation (Optional)</Label>
                <Textarea
                  id="explanation"
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="Explain why this answer is correct"
                />
              </div>

              <Button onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          </Card>

          {/* Save Quiz */}
          <div className="flex gap-4 pt-4">
            <Button onClick={saveQuiz} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {editQuiz ? 'Update Quiz' : 'Create Quiz'}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};