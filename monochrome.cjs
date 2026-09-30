const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const componentsDir = path.join(__dirname, 'src', 'components');

// 1. Update CSS to Monochrome
const cssPath = path.join(__dirname, 'src', 'index.css');
const cssContent = `@import "tailwindcss";

@theme {
  --color-ecobank-50: #f9fafb;
  --color-ecobank-100: #f3f4f6;
  --color-ecobank-500: #6b7280;
  --color-ecobank-600: #111827;
  --color-ecobank-900: #000000;
  --color-success: #111827; /* black */
  --color-warning: #6b7280; /* gray */
  --color-danger: #374151;  /* dark gray */
}

@layer base {
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    @apply text-gray-900 bg-white min-h-screen antialiased;
  }
}
`;
fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. Update Layout.tsx for Mobile Responsiveness (Bottom Nav)
const layoutPath = path.join(componentsDir, 'Layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = `import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Send, BarChart2, Settings, Shield } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transfer', path: '/transfer', icon: Send },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Admin', path: '/admin', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 z-10">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-2xl text-black">
            <Shield className="h-8 w-8 text-black fill-black" />
            SurePay
          </div>
          <p className="text-xs text-gray-500 mt-1">Monochrome Edition</p>
        </div>
        <nav className="mt-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={\`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors \${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }\`}
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
          <h1 className="text-xl font-semibold text-black">
            {navItems.find(i => i.path === location.pathname)?.name || 'SurePay'}
          </h1>
          <div className="flex items-center gap-4">
             <span className="hidden md:inline text-sm text-gray-500 font-medium">Prototype</span>
             <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
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
              className={\`flex flex-col items-center justify-center w-full h-full space-y-1 \${
                isActive ? 'text-black' : 'text-gray-400'
              }\`}
            >
              <Icon className={\`h-5 w-5 \${isActive ? 'fill-black' : ''}\`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;`;
fs.writeFileSync(layoutPath, layoutContent, 'utf8');

// 3. Make grids responsive in Dashboard
let dashboardContent = fs.readFileSync(path.join(pagesDir, 'Dashboard.tsx'), 'utf8');
dashboardContent = dashboardContent.replace(/grid grid-cols-4 gap-4/g, 'grid grid-cols-2 md:grid-cols-4 gap-4');
// Remove gradients from Dashboard for monochrome
dashboardContent = dashboardContent.replace(/bg-gradient-to-r from-ecobank-900 to-ecobank-600/g, 'bg-black');
dashboardContent = dashboardContent.replace(/text-ecobank-100/g, 'text-gray-300');
fs.writeFileSync(path.join(pagesDir, 'Dashboard.tsx'), dashboardContent, 'utf8');

// 4. Update Admin Dashboard
let adminContent = fs.readFileSync(path.join(pagesDir, 'AdminDashboard.tsx'), 'utf8');
adminContent = adminContent.replace(/bg-orange-100/g, 'bg-gray-200');
adminContent = adminContent.replace(/text-orange-600/g, 'text-black');
adminContent = adminContent.replace(/bg-danger\/10/g, 'bg-gray-100');
adminContent = adminContent.replace(/border-danger\/20/g, 'border-gray-300');
adminContent = adminContent.replace(/text-red-900\/80/g, 'text-gray-700');
fs.writeFileSync(path.join(pagesDir, 'AdminDashboard.tsx'), adminContent, 'utf8');

// 5. Update Tracker
let trackerContent = fs.readFileSync(path.join(pagesDir, 'Tracker.tsx'), 'utf8');
trackerContent = trackerContent.replace(/bg-orange-50/g, 'bg-gray-50');
trackerContent = trackerContent.replace(/border-orange-200/g, 'border-gray-300');
trackerContent = trackerContent.replace(/text-orange-500/g, 'text-black');
trackerContent = trackerContent.replace(/text-orange-900/g, 'text-black');
trackerContent = trackerContent.replace(/text-orange-800/g, 'text-gray-700');
fs.writeFileSync(path.join(pagesDir, 'Tracker.tsx'), trackerContent, 'utf8');

// 6. Update Transfer
let transferContent = fs.readFileSync(path.join(pagesDir, 'Transfer.tsx'), 'utf8');
transferContent = transferContent.replace(/bg-orange-100/g, 'bg-gray-200');
transferContent = transferContent.replace(/text-orange-500/g, 'text-black');
transferContent = transferContent.replace(/bg-orange-50/g, 'bg-gray-50');
transferContent = transferContent.replace(/border-orange-100/g, 'border-gray-300');
transferContent = transferContent.replace(/text-orange-600/g, 'text-black');
fs.writeFileSync(path.join(pagesDir, 'Transfer.tsx'), transferContent, 'utf8');

// 7. Update ReliabilityCenter
let analyticsContent = fs.readFileSync(path.join(pagesDir, 'ReliabilityCenter.tsx'), 'utf8');
analyticsContent = analyticsContent.replace(/bg-orange-50/g, 'bg-gray-50');
analyticsContent = analyticsContent.replace(/border-orange-100/g, 'border-gray-200');
analyticsContent = analyticsContent.replace(/text-orange-500/g, 'text-black');
analyticsContent = analyticsContent.replace(/text-orange-900/g, 'text-black');
analyticsContent = analyticsContent.replace(/text-orange-800/g, 'text-gray-700');
analyticsContent = analyticsContent.replace(/text-orange-600/g, 'text-gray-500');
fs.writeFileSync(path.join(pagesDir, 'ReliabilityCenter.tsx'), analyticsContent, 'utf8');

console.log('Mobile responsiveness and Monochrome theme applied.');
