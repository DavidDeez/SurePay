import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
