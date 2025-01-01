'use client'

import { useState, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

export default function SkillsForm() {
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const response = await fetch('/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills }),
    });

    if (response.ok) {
      alert('Skills saved successfully');
    } else {
      const errorData = await response.json();
      alert(`Error saving skills: ${errorData.error}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Highlight your key skills to demonstrate your qualifications for the job.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="skill-input">Skill</Label>
          <div className="flex space-x-2">
            <Input
              id="skill-input"
              placeholder="Enter a skill"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={addSkill}>Add</Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Added Skills</Label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={`Remove ${skill}`}
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">Save Skills</Button>
      </CardFooter>
    </Card>
  );
}
