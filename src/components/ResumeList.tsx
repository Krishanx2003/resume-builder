// components/ResumeList.tsx
import React from 'react';

interface Resume {
  id: string;
  title: string;
}

interface ResumeListProps {
  resumes: Resume[];
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes }) => {
  return (
    <div>
      <h1>Your Resumes</h1>
      {resumes.map((resume) => (
        <div key={resume.id}>{resume.title}</div>
      ))}
    </div>
  );
};

export default ResumeList;
