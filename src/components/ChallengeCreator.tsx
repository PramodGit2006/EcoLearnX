import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { useChallenge, Challenge } from '@/contexts/ChallengeContext';
import { useToast } from '@/hooks/use-toast';

interface ChallengeCreatorProps {
  onClose: () => void;
  editChallenge?: Challenge;
}

export const ChallengeCreator: React.FC<ChallengeCreatorProps> = ({ onClose, editChallenge }) => {
  const { addChallenge, updateChallenge } = useChallenge();
  const { toast } = useToast();
  
  const [challengeData, setChallengeData] = useState<Omit<Challenge, 'id'>>({
    title: editChallenge?.title || '',
    description: editChallenge?.description || '',
    category: editChallenge?.category || 'Conservation',
    icon: editChallenge?.icon || 'TreePine',
    difficulty: editChallenge?.difficulty || 'Easy',
    deadline: editChallenge?.deadline || '',
    xp: editChallenge?.xp || 200,
    requirements: editChallenge?.requirements || [''],
    status: 'active',
    progress: 0,
  });

  const categories = ['Conservation', 'Lifestyle', 'Energy', 'Action', 'Education'];
  const icons = ['TreePine', 'Recycle', 'Lightbulb', 'Leaf', 'Target', 'Award'];

  const addRequirement = () => {
    setChallengeData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setChallengeData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    if (challengeData.requirements.length > 1) {
      setChallengeData(prev => ({
        ...prev,
        requirements: prev.requirements.filter((_, i) => i !== index)
      }));
    }
  };

  const saveChallenge = () => {
    if (!challengeData.title || !challengeData.description || !challengeData.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const filteredRequirements = challengeData.requirements.filter(req => req.trim() !== '');
    if (filteredRequirements.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one requirement",
        variant: "destructive"
      });
      return;
    }

    const finalData = { ...challengeData, requirements: filteredRequirements };

    if (editChallenge) {
      updateChallenge(editChallenge.id, finalData);
      toast({
        title: "Success",
        description: "Challenge updated successfully!"
      });
    } else {
      addChallenge(finalData);
      toast({
        title: "Success",
        description: "Challenge created successfully!"
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{editChallenge ? 'Edit Challenge' : 'Create New Challenge'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Challenge Title *</Label>
              <Input
                id="title"
                value={challengeData.title}
                onChange={(e) => setChallengeData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter challenge title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={challengeData.description}
                onChange={(e) => setChallengeData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what participants need to do"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={challengeData.category}
                onValueChange={(value) => setChallengeData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={challengeData.icon}
                onValueChange={(value) => setChallengeData(prev => ({ ...prev, icon: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {icons.map(icon => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={challengeData.difficulty}
                onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => 
                  setChallengeData(prev => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline *</Label>
              <Input
                id="deadline"
                type="date"
                value={challengeData.deadline}
                onChange={(e) => setChallengeData(prev => ({ ...prev, deadline: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="xp">XP Reward</Label>
              <Input
                id="xp"
                type="number"
                value={challengeData.xp}
                onChange={(e) => setChallengeData(prev => ({ ...prev, xp: parseInt(e.target.value) || 200 }))}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Requirements *</Label>
              <Button variant="outline" size="sm" onClick={addRequirement}>
                <Plus className="h-4 w-4 mr-1" />
                Add Requirement
              </Button>
            </div>
            
            <div className="space-y-3">
              {challengeData.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                  />
                  {challengeData.requirements.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Save Challenge */}
          <div className="flex gap-4 pt-4">
            <Button onClick={saveChallenge} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {editChallenge ? 'Update Challenge' : 'Create Challenge'}
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