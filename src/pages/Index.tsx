
import React from 'react';
import Layout from '@/components/Layout';
import SearchBox from '@/components/SearchBox';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-12 animate-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Horizon
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive background intelligence powered by OSINT and AI
          </p>
        </div>
        
        <SearchBox />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-in animate-delay-400">
          {[
            {
              title: 'Identity Information',
              description: 'Discover names, emails, phone numbers, and more'
            },
            {
              title: 'Digital Footprint',
              description: 'Analyze social media profiles and web presence'
            },
            {
              title: 'Security Intelligence',
              description: 'Identify potential security risks and vulnerabilities'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
