
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const ReportsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Reports</h1>
        
        <div className="section-card text-center py-12">
          <FileText size={48} className="mx-auto mb-4 text-gray-500" />
          <h2 className="text-xl font-medium mb-2">No reports generated yet</h2>
          <p className="text-gray-400 mb-6">
            Search for a profile and generate a report to see it here
          </p>
          <Button onClick={() => navigate('/')}>Start Searching</Button>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
