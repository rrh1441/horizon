
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, HistoryIcon, FileTextIcon, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-white/5 dark:bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold tracking-tight">Horizon</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 text-sm font-medium"
            onClick={() => navigate('/')}
          >
            <SearchIcon className="w-4 h-4" />
            <span>Search</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 text-sm font-medium"
            onClick={() => navigate('/history')}
          >
            <HistoryIcon className="w-4 h-4" />
            <span>History</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 text-sm font-medium"
            onClick={() => navigate('/reports')}
          >
            <FileTextIcon className="w-4 h-4" />
            <span>Reports</span>
          </Button>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            className="hidden md:flex border border-white/10 bg-white/5 rounded-full px-4 py-2 text-sm"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          
          <Button 
            className="hidden md:flex rounded-full px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
