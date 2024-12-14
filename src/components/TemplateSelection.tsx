// components/TemplateSelection.tsx
"use client";
import { useEffect, useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const TemplateSelection: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/resume');
        const data = await response.json();
        if (response.ok) {
          setContacts(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch contacts');
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Select a Template</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default TemplateSelection;
