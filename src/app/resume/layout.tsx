import React from 'react';
import Sidebar from './components/Sidebar';
import RightBar from './components/RightBar';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </main>
      <RightBar />
    </div>
  );
};

export default Layout;
