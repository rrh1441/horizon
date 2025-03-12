
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // In a real app, we would send this to an API
    // For now, we'll just simulate a delay and navigate to a profile page
    setTimeout(() => {
      setIsLoading(false);
      // Store in local history
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newHistory = [
        { id: Date.now(), query, timestamp: new Date().toISOString() },
        ...history,
      ].slice(0, 10); // Keep only 10 most recent searches
      
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      // Navigate to profile page
      navigate(`/profile/${encodeURIComponent(query)}`);
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-in animate-delay-200">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search 
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            size={20} 
          />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, domain, or phone number..."
            className="search-bar pl-12 pr-12 text-base md:text-lg h-16"
            disabled={isLoading}
          />
          
          <Button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 flex items-center justify-center"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight size={18} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
