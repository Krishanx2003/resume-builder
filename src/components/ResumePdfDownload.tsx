"use client"
import { useState } from 'react';

interface ResumePdfDownloadProps {
  title: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  template: string;
}

const ResumePdfDownload: React.FC<ResumePdfDownloadProps> = ({ title, fullName, email, phone, location, template }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePDF = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/generate-resume-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          full_name: fullName,
          email,
          phone,
          location,
          template,
        }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume.pdf';
      link.click();
      setMessage('Resume downloaded successfully!');
    } catch (error: any) {
      setMessage(`Error: ${error.message || 'Something went wrong.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCreatePDF}
        disabled={loading}
        style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating PDF...' : 'Download Resume'}
      </button>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default ResumePdfDownload;
