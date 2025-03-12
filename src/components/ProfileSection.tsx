
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  delay?: number;
}

const ProfileSection = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false,
  delay = 0
}: ProfileSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className={cn(
        "section-card overflow-hidden mb-4",
        "animate-in",
        `animate-delay-${delay}`
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-white/5">
            {icon}
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ProfileSection;
