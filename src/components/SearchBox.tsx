import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, User, Mail, Globe, Briefcase, Phone, AlertCircle, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type FieldType = 'email' | 'domain' | 'employer' | 'phone';

interface FieldData {
  id: string;
  type: FieldType;
  value: string;
}

interface SearchBoxProps {
  buttonText?: string;
}

const SearchBox = ({ buttonText = "Search" }: SearchBoxProps) => {
  const [name, setName] = useState('');
  const [fields, setFields] = useState<FieldData[]>([
    { id: crypto.randomUUID(), type: 'email', value: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    setError('');
    
    if (!name.trim() || name.length < 2) {
      setError('Please enter a valid name (minimum 2 characters)');
      return false;
    }
    
    const hasValue = fields.some(field => field.value.trim() !== '');
    if (!hasValue) {
      setError('Please enter at least one additional identifier');
      return false;
    }
    
    for (const field of fields) {
      if (field.value.trim() !== '' && !fieldConfig[field.type].validate(field.value)) {
        setError(fieldConfig[field.type].errorMessage);
        return false;
      }
    }
    
    return true;
  };

  const handleAddField = () => {
    setFields([...fields, { 
      id: crypto.randomUUID(),
      type: 'email', 
      value: '' 
    }]);
  };

  const handleRemoveField = (id: string) => {
    if (fields.length > 1) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

  const handleFieldTypeChange = (id: string, type: FieldType) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, type } : field
    ));
  };

  const handleFieldValueChange = (id: string, value: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
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
    
    const searchData = {
      name: name.trim(),
      fields: fields.filter(f => f.value.trim() !== '').map(f => ({ 
        type: f.type, 
        value: f.value.trim() 
      }))
    };
    
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [
      { 
        id: Date.now(), 
        query: name, 
        fields: searchData.fields,
        timestamp: new Date().toISOString() 
      },
      ...history,
    ].slice(0, 10);
    
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/profile/${encodeURIComponent(name)}`);
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
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
        
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-2">
              <div className="sm:w-1/3 flex gap-2">
                <div className="flex-1">
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldTypeChange(field.id, e.target.value as FieldType)}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-base h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    disabled={isLoading}
                  >
                    <option value="email">Email</option>
                    <option value="domain">Domain</option>
                    <option value="employer">Employer</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
                
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveField(field.id)}
                    className="h-14 w-14 border border-white/10 bg-white/5"
                    disabled={isLoading}
                  >
                    <X size={18} />
                  </Button>
                )}
              </div>
              
              <div className="relative sm:w-2/3">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  {fieldConfig[field.type].icon}
                </div>
                
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
                  placeholder={fieldConfig[field.type].placeholder}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-12 pr-4 py-3 text-base h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddField}
            className="w-full border border-white/10 bg-white/5 h-12"
            disabled={isLoading}
          >
            <Plus size={18} className="mr-2" />
            Add another identifier
          </Button>
        </div>
        
        <Button 
          type="submit"
          className="w-full h-14 mt-2 text-lg"
          disabled={isLoading || !name.trim() || !fields.some(f => f.value.trim() !== '')}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Search size={18} className="mr-2" />
          )}
          {buttonText}
        </Button>
        
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
