// components/ResumeDetail.tsx
import React from 'react';
import jsPDF from 'jspdf';

interface Resume {
  id: string;
  title: string;
  content: string;
}

interface ResumeDetailProps {
  resume: Resume;
}

const ResumeDetail: React.FC<ResumeDetailProps> = ({ resume }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(resume.title, 10, 10);
    doc.text(resume.content, 10, 20);
    doc.save('resume.pdf');
  };

  return (
    <div>
      <h1>{resume.title}</h1>
      <p>{resume.content}</p>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default ResumeDetail;
