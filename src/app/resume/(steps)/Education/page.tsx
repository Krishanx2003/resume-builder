"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EducationEntry {
  schoolName: string;
  degree: string;
  graduationMonth: string;
  graduationYear: string;
  relevantCourses: string;
}

export default function EducationForm() {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    { schoolName: '', degree: '', graduationMonth: '', graduationYear: '', relevantCourses: '' }
  ]);

  const handleInputChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updatedEntries = [...educationEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setEducationEntries(updatedEntries);
  };

  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { schoolName: '', degree: '', graduationMonth: '', graduationYear: '', relevantCourses: '' }]);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/education-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationEntries),
      });

      if (response.ok) {
        alert('Education info created successfully');
      } else {
        try {
          const errorData = await response.json();
          alert(`Error creating education info: ${errorData.error}`);
        } catch (jsonError) {
          alert('An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Provide your educational background to highlight your qualifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {educationEntries.map((entry, index) => (
          <div key={index} className="space-y-4">
            {index > 0 && <hr className="my-6" />}
            <div className="space-y-2">
              <Label htmlFor={`schoolName-${index}`}>School Name</Label>
              <Input
                id={`schoolName-${index}`}
                placeholder="Enter school name"
                value={entry.schoolName}
                onChange={(e) => handleInputChange(index, 'schoolName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree</Label>
              <Input
                id={`degree-${index}`}
                placeholder="Enter your degree"
                value={entry.degree}
                onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`graduationMonth-${index}`}>Graduation Month</Label>
                <Select
                  value={entry.graduationMonth}
                  onValueChange={(value) => handleInputChange(index, 'graduationMonth', value)}
                >
                  <SelectTrigger id={`graduationMonth-${index}`}>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`graduationYear-${index}`}>Graduation Year</Label>
                <Select
                  value={entry.graduationYear}
                  onValueChange={(value) => handleInputChange(index, 'graduationYear', value)}
                >
                  <SelectTrigger id={`graduationYear-${index}`}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`relevantCourses-${index}`}>Relevant Courses</Label>
              <Textarea
                id={`relevantCourses-${index}`}
                placeholder="List relevant courses (optional)"
                value={entry.relevantCourses}
                onChange={(e) => handleInputChange(index, 'relevantCourses', e.target.value)}
              />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={addEducationEntry}>Add Another Degree</Button>
        <Button onClick={handleSave}>Save Education</Button>
      </CardFooter>
    </Card>
  );
}