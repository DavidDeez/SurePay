import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Send, BarChart2, Settings, Shield } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transfer', path: '/transfer', icon: Send },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Admin', path: '/admin', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] pb-16 md:pb-0">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 z-10">
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
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-8 justify-between sticky top-0 z-10">
          <div className="md:hidden flex items-center gap-2 font-bold text-lg text-ecobank-900 mr-3">
            <Shield className="h-6 w-6 text-ecobank-500" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 flex-1">
            {navItems.find(i => i.path === location.pathname)?.name || 'SurePay'}
          </h1>
          <div className="flex items-center gap-4">
             <span className="hidden md:inline text-sm text-gray-500 font-medium">Prototype</span>
             <div className="h-8 w-8 rounded-full bg-ecobank-100 flex items-center justify-center text-ecobank-900 font-bold text-sm">
               DO
             </div>
          </div>
        </header>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-ecobank-600' : 'text-gray-400'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-ecobank-600 fill-ecobank-100' : ''}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;