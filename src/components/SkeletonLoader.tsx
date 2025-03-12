
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div 
      className={cn(
        "animate-pulse-subtle rounded-md bg-white/10", 
        className
      )}
    />
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="section-card">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
      
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="section-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          
          <div className="mt-6 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      ))}
    </div>
  );
};
