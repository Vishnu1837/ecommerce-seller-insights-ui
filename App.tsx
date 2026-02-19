
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import HomeDashboard from './components/HomeDashboard';
import TransactionList from './components/TransactionList';
import InventoryHealth from './components/InventoryHealth';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Placeholder for under-construction views
  const UnderConstruction = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
      <span className="material-symbols-outlined text-6xl mb-4">construction</span>
      <p className="text-lg font-medium">{title} is under construction</p>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen flex bg-background-light dark:bg-background-dark transition-colors duration-200">
        {/* Sidebar - Desktop Only */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col w-full min-w-0">
          <Header
            isDarkMode={isDarkMode}
            onToggleDark={toggleDarkMode}
          />

          <main className="flex-1 overflow-y-auto pb-24 md:pb-8 max-w-7xl mx-auto w-full">
            <div className="p-0 md:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<HomeDashboard />} />
                <Route path="/orders" element={<TransactionList />} />
                <Route path="/analytics" element={<InventoryHealth />} />
                <Route path="/listings" element={<UnderConstruction title="Listings" />} />
                <Route path="/messages" element={<UnderConstruction title="Messages" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNav />
        </div>
      </div>
    </Router>
  );
};

export default App;

export default App;
