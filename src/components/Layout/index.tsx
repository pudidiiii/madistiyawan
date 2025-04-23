
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // This is just to verify we're in a Router context
  // It will throw an error if we're not, which is what we want to prevent
  try {
    useLocation();
  } catch (error) {
    console.error("Layout rendered outside Router context:", error);
    // Render without navbar if outside router context
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow pt-16">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
