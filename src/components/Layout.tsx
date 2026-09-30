import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Send, Activity, Settings, BarChart2, Shield } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transfer', path: '/transfer', icon: Send },
    { name: 'Reliability Center', path: '/analytics', icon: BarChart2 },
    { name: 'Operations', path: '/admin', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-2xl text-ecobank-900">
            <Shield className="h-8 w-8 text-ecobank-500" />
            SurePay
          </div>
          <p className="text-xs text-gray-500 mt-1">Ecobank Innovation Concept</p>
        </div>
        <nav className="mt-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ecobank-50 text-ecobank-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find(i => i.path === location.pathname)?.name || 'SurePay'}
          </h1>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">Prototype / Simulated Data</span>
             <div className="h-8 w-8 rounded-full bg-ecobank-100 flex items-center justify-center text-ecobank-900 font-bold">
               DO
             </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
