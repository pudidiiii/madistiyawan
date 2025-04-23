
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import ContactSection from '../components/Contact/ContactSection';
import emailjs from '@emailjs/browser';

// EmailJS public key - this is safe to include in client-side code
const EMAIL_PUBLIC_KEY = 'q3PJqUEI7KsLVJMZQ'; 
// EmailJS service and template IDs
const EMAIL_SERVICE_ID = 'service_portfolio';
const EMAIL_TEMPLATE_ID = 'template_contact';

const Contact = () => {
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(EMAIL_PUBLIC_KEY);
    
    // Log that EmailJS has been initialized
    console.log('EmailJS initialized with public key');
  }, []);

  return (
    <Layout>
      <ContactSection 
        emailServiceId={EMAIL_SERVICE_ID}
        emailTemplateId={EMAIL_TEMPLATE_ID}
        emailPublicKey={EMAIL_PUBLIC_KEY}
      />
    </Layout>
  );
};

export default Contact;
