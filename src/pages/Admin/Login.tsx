
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a simple login mock - in a real app, you'd authenticate with a server
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        // Set authentication status
        sessionStorage.setItem('adminAuthenticated', 'true');
        toast({
          title: "Success!",
          description: "You have been logged in successfully.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Authentication Error",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to access the admin panel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-purple"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-purple"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 gradient-bg text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Enteni Sekk...
              </>
            ) : (
              'Login'
            )}
          </button>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>Test credentials:</p>
            <p>Username: admin / Password: password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
