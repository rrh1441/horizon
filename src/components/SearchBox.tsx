
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, User, Mail, Globe, Briefcase, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type SearchField = 'email' | 'domain' | 'employer' | 'phone';

const SearchBox = () => {
  const [name, setName] = useState('');
  const [secondaryValue, setSecondaryValue] = useState('');
  const [secondaryField, setSecondaryField] = useState<SearchField>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Field configuration
  const fieldConfig = {
    email: {
      icon: <Mail size={20} />,
      placeholder: 'Email address',
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === '',
      errorMessage: 'Please enter a valid email address'
    },
    domain: {
      icon: <Globe size={20} />,
      placeholder: 'Domain (e.g., example.com)',
      validate: (value: string) => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(value) || value === '',
      errorMessage: 'Please enter a valid domain'
    },
    employer: {
      icon: <Briefcase size={20} />,
      placeholder: 'Current employer',
      validate: (value: string) => value.length > 1 || value === '',
      errorMessage: 'Employer must be at least 2 characters'
    },
    phone: {
      icon: <Phone size={20} />,
      placeholder: 'Phone number',
      validate: (value: string) => /^(\+\d{1,3})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value) || value === '',
      errorMessage: 'Please enter a valid phone number'
    }
  };

  const validateFields = () => {
    // Clear any existing errors
    setError('');
    
    // Validate name (required)
    if (!name.trim() || name.length < 2) {
      setError('Please enter a valid name (minimum 2 characters)');
      return false;
    }
    
    // Validate secondary field (required)
    if (!secondaryValue.trim()) {
      setError(`Please enter a ${secondaryField}`);
      return false;
    }
    
    // Validate format of secondary field
    if (!fieldConfig[secondaryField].validate(secondaryValue)) {
      setError(fieldConfig[secondaryField].errorMessage);
      return false;
    }
    
    return true;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFields()) {
      toast({
        title: "Invalid search",
        description: error,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Create a query object with all the data
    const searchData = {
      name: name.trim(),
      [secondaryField]: secondaryValue.trim()
    };
    
    // Store in local history
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [
      { 
        id: Date.now(), 
        query: name, 
        secondaryField,
        secondaryValue,
        timestamp: new Date().toISOString() 
      },
      ...history,
    ].slice(0, 10); // Keep only 10 most recent searches
    
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
    // In a real app, we would send this to an API
    // For now, simulate a delay and navigate
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to profile page with the search query
      navigate(`/profile/${encodeURIComponent(name)}`);
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        {/* Name field (always required) */}
        <div className="relative">
          <User 
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            size={20} 
          />
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (required)"
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-12 pr-4 py-3 text-base h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        
        {/* Field selector and secondary field */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Field selector */}
          <div className="sm:w-1/3">
            <select
              value={secondaryField}
              onChange={(e) => setSecondaryField(e.target.value as SearchField)}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-base h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              disabled={isLoading}
            >
              <option value="email">Email</option>
              <option value="domain">Domain</option>
              <option value="employer">Employer</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          
          {/* Secondary input field */}
          <div className="relative sm:w-2/3">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {fieldConfig[secondaryField].icon}
            </div>
            
            <input
              type="text"
              value={secondaryValue}
              onChange={(e) => setSecondaryValue(e.target.value)}
              placeholder={fieldConfig[secondaryField].placeholder}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-12 pr-12 py-3 text-base h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            
            <Button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 flex items-center justify-center"
              disabled={isLoading || !name.trim() || !secondaryValue.trim()}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowRight size={18} />
              )}
            </Button>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mt-1">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBox;
