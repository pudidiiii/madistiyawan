
import React, { ReactNode, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, Folder, PlusSquare, LayoutDashboard, LogOut, 
  Menu, X, ChevronRight, MessageSquare, Award
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

// Simple auth check to see if user is authenticated
// In a real app, you'd use a more robust auth system
const isAuthenticated = () => {
  return sessionStorage.getItem('adminAuthenticated') === 'true';
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" />;
  }
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/projects', label: 'Projects', icon: <Folder size={20} /> },
    { path: '/admin/add-project', label: 'Add Project', icon: <PlusSquare size={20} /> },
    { path: '/admin/comments', label: 'Comments', icon: <MessageSquare size={20} /> },
    { path: '/admin/certificates', label: 'Certificates', icon: <Award size={20} /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden bg-brand-purple text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-white/10 z-40 transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-white/10">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">Adi Admin</span>
          </Link>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-brand-purple text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 w-full rounded-lg hover:bg-white/10 text-red-400 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
