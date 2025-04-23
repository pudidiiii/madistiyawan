
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    // Simulate loading process
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 10) + 1;
          return next > 100 ? 100 : next;
        });
      }, 150);
    } else {
      // Delay completion for a smoother experience
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Welcome to Portfolio</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Muhammad Adi Stiyawan
        </h2>

        <div className="flex justify-center mb-8">
          <div className="loader"></div>
        </div>
        
        <div className="w-64 md:w-80 bg-white/10 rounded-full h-2 mb-2">
          <div 
            className="h-full gradient-bg rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-muted-foreground">Loading... {progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
