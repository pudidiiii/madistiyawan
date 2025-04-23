
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Home from './Home';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <Home />
      )}
    </>
  );
};

export default Index;
