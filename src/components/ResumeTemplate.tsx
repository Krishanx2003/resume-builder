// components/ResumeTemplate.tsx
import React from 'react';

interface ResumeTemplateProps {
  title: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ title, fullName, email, phone, location }) => {
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>{title}</h1>
      <h2>{fullName}</h2>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{location}</p>
    </div>
  );
};

export default ResumeTemplate;
