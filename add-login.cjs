const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const pagesDir = path.join(srcDir, 'pages');

// 1. Create Login.tsx
const loginContent = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-8">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-ecobank-50 rounded-2xl flex items-center justify-center">
            <Shield className="h-10 w-10 text-ecobank-600" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SurePay</h1>
          <p className="text-gray-500 mt-2">Payment Reliability Intelligence Platform</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 bg-ecobank-600 text-white rounded-xl font-semibold hover:bg-ecobank-900 transition flex items-center justify-center gap-2 active:scale-95"
          >
            Enter Guest Mode
          </button>
          <p className="text-xs text-gray-400 px-4">
            This is an Ecobank innovation prototype. No real credentials required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
`;
fs.writeFileSync(path.join(pagesDir, 'Login.tsx'), loginContent, 'utf8');

// 2. Update App.tsx
const appContent = `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Tracker from './pages/Tracker';
import AdminDashboard from './pages/AdminDashboard';
import ReliabilityCenter from './pages/ReliabilityCenter';
import Layout from './components/Layout';
import Receipt from './pages/Receipt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/transfer" element={<Layout><Transfer /></Layout>} />
        <Route path="/tracker/:id" element={<Layout><Tracker /></Layout>} />
        <Route path="/receipt/:id" element={<Layout><Receipt /></Layout>} />
        <Route path="/analytics" element={<Layout><ReliabilityCenter /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
`;
fs.writeFileSync(path.join(srcDir, 'App.tsx'), appContent, 'utf8');

// 3. Update Layout.tsx (path to /dashboard)
let layoutContent = fs.readFileSync(path.join(srcDir, 'components', 'Layout.tsx'), 'utf8');
layoutContent = layoutContent.replace(/{ name: 'Dashboard', path: '\/', icon: LayoutDashboard }/g, "{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }");
fs.writeFileSync(path.join(srcDir, 'components', 'Layout.tsx'), layoutContent, 'utf8');

// 4. Shrink Blue Section in Dashboard
let dashboardContent = fs.readFileSync(path.join(pagesDir, 'Dashboard.tsx'), 'utf8');
dashboardContent = dashboardContent.replace(/p-8/g, 'p-6 md:p-8');
dashboardContent = dashboardContent.replace(/mt-8/g, 'mt-5 md:mt-8');
dashboardContent = dashboardContent.replace(/text-4xl/g, 'text-3xl md:text-4xl');
fs.writeFileSync(path.join(pagesDir, 'Dashboard.tsx'), dashboardContent, 'utf8');

// 5. Update redirects in Transfer and Tracker
let transferContent = fs.readFileSync(path.join(pagesDir, 'Transfer.tsx'), 'utf8');
transferContent = transferContent.replace(/navigate\('\/'\)/g, "navigate('/dashboard')");
fs.writeFileSync(path.join(pagesDir, 'Transfer.tsx'), transferContent, 'utf8');

let trackerContent = fs.readFileSync(path.join(pagesDir, 'Tracker.tsx'), 'utf8');
trackerContent = trackerContent.replace(/navigate\('\/'\)/g, "navigate('/dashboard')");
fs.writeFileSync(path.join(pagesDir, 'Tracker.tsx'), trackerContent, 'utf8');

console.log('Login page added and blue section updated.');
