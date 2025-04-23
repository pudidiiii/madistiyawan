
import React from 'react';
import { ArrowRight, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-brand-purple/20 text-brand-purple font-medium">
              <span className="flex items-center">
                <span className="mr-2">✨</span>
                Ready to Innovate
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="text-white">Creative</span><br />
              <span className="gradient-text">Specialists</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Menciptakan Desain yang inovatif, Fungisonal dan Enak dipandang seperti memandang nya.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {["Adobe Illustrator", "Adobe Premier Pro", "Adobe Photoshop", "Figma", "Capcut"].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                to="/portfolio" 
                className="px-6 py-3 rounded-lg gradient-bg text-white font-medium hover:opacity-90 transition-opacity flex items-center"
              >
                Projects <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <Link 
                to="/contact" 
                className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="mt-10 flex items-center space-x-4">
              <a 
                href="https://github.com/adisaja22" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-purple/20 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.934.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/muhammad-adi-stiyawan/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-purple/20 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              
              <a 
                href="https://www.instagram.com/madstywnnn/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-purple/20 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <img 
                src="/public/lovable-uploads/c7e5f332-f018-4dbe-a6ed-5c636de77a37.png" 
                alt="Creative specialist illustration" 
                className="w-full max-w-md"
              />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-brand-purple/30 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden lg:block absolute top-1/4 left-8 w-24 h-24 rounded-full bg-brand-blue/10 animate-spin-slow"></div>
      <div className="hidden lg:block absolute bottom-1/4 right-8 w-16 h-16 rounded-full bg-brand-purple/10 animate-spin-slow"></div>
    </div>
  );
};

export default HeroSection;
