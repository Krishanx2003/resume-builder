"use client";
import { useState } from 'react';

interface Contact {
  name: string;
  email: string;
  phone: string;
}

const ContactForm: React.FC = () => {
  const [contact, setContact] = useState<Contact>({ name: '', email: '', phone: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true);
    const response = await fetch('/api/resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      // Optionally, clear the form or show a success message
    } else {
      setError(data.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" onChange={handleChange} placeholder="Phone" required />
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ContactForm;
