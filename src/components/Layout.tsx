
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      <main className="pt-24 pb-16 px-4 overflow-auto min-h-[calc(100vh-100px)] flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout;
