"use client";
import { useEffect, useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const ResumeDisplay: React.FC = () => {
  const [contact, setContact] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('/api/resume');
      const data = await response.json();
      if (response.ok) {
        setContact(data);
      } else {
        console.error(data.error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  const fetchContactByEmail = async () => {
    setLoading(true);
    const response = await fetch(`/api/resume?email=${email}`);
    const data = await response.json();
    if (response.ok) {
      setContact(data);
    } else {
      console.error(data.error);
    }
    setLoading(false);
  };
  

  return (
    <div>
      <h2>Contact List</h2>
      <div>
        <input
          type="email"
          placeholder="Enter email to fetch contact"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchContactByEmail}>Fetch Contact</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : contact && contact.length > 0 ? (
        contact.map(c => (
          <div key={c.id}>
            <p>Name: {c.name}</p>
            <p>Email: {c.email}</p>
            <p>Phone: {c.phone}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No contacts available.</p>
      )}
    </div>
  );
};

export default ResumeDisplay;
