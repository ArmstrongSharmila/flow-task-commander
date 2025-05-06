
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, CheckSquare, Home, LogOut, Plus, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Add Task', href: '/tasks/new', icon: Plus },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={user.picture}
            alt={user.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <span className="font-medium">{user.name}</span>
        </div>
        <Button 
          variant="ghost"
          onClick={logout}
          size="icon"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-sidebar">
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-primary-purple">TaskFlow</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-purple text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${isActive(item.href) ? 'text-white' : 'text-gray-500'}`} />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <img 
              src={user.picture}
              alt={user.name}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <Button 
              variant="ghost"
              onClick={logout}
              size="icon"
              className="text-gray-400 hover:text-gray-500"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-5 h-16">
          {navigation.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex flex-col items-center justify-center"
            >
              <item.icon 
                className={`h-5 w-5 ${isActive(item.href) ? 'text-primary-purple' : 'text-gray-500'}`}
              />
              <span className={`text-xs mt-1 ${isActive(item.href) ? 'text-primary-purple font-medium' : 'text-gray-500'}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
