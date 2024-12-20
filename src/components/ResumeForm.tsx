"use client"
import { useState } from 'react';
import ResumePdfDownload from './ResumePdfDownload';

const ResumeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [template, setTemplate] = useState('template1'); // Added template selection
  const [resumeCreated, setResumeCreated] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateResume = async () => {
    if (!title || !fullName || !email || !phone || !location) {
      setMessage('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/resumes', {
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
        }),
      });

      if (response.ok) {
        setResumeCreated(true);
        setMessage('Resume created successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Something went wrong.'}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message || 'Something went wrong.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
      >
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
        <option value="template3">Template 3</option>
      </select>
      <button
        onClick={handleCreateResume}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Creating Resume...' : 'Create Resume'}
      </button>
      {resumeCreated && (
        <ResumePdfDownload
          title={title}
          fullName={fullName}
          email={email}
          phone={phone}
          location={location}
          template={template}
        />
      )}
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default ResumeForm;
