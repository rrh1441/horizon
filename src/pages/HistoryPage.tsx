
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Search, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

interface SearchHistoryItem {
  id: number;
  query: string;
  timestamp: string;
}

const HistoryPage = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
      setHistory(JSON.parse(searchHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  };

  const removeHistoryItem = (id: number) => {
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const repeatSearch = (query: string) => {
    navigate(`/profile/${encodeURIComponent(query)}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Search History</h1>
          
          {history.length > 0 && (
            <Button 
              variant="destructive" 
              className="flex items-center space-x-2"
              onClick={clearHistory}
            >
              <Trash2 size={16} />
              <span>Clear All</span>
            </Button>
          )}
        </div>
        
        {history.length === 0 ? (
          <div className="section-card text-center py-12">
            <Clock size={48} className="mx-auto mb-4 text-gray-500" />
            <h2 className="text-xl font-medium mb-2">No search history yet</h2>
            <p className="text-gray-400 mb-6">
              Your recent searches will appear here
            </p>
            <Button onClick={() => navigate('/')}>Start Searching</Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in">
            {history.map((item, index) => (
              <div 
                key={item.id} 
                className="section-card flex items-center justify-between"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div>
                  <p className="font-medium mb-1">{item.query}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center space-x-1"
                    onClick={() => repeatSearch(item.query)}
                  >
                    <Search size={14} />
                    <span>Search Again</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeHistoryItem(item.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;
