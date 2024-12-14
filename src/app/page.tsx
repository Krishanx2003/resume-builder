import ContactForm from '@/components/ContactForm';
import TemplateSelection from '@/components/TemplateSelection';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Resume App</h1>
      <section>
        <h2>Add a New Contact</h2>
        <ContactForm />
      </section>
      <section>
        <TemplateSelection />
      </section>
     
    </div>
  );
};

export default HomePage;
