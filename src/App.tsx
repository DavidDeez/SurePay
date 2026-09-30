import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/tracker/:id" element={<Tracker />} />
          <Route path="/receipt/:id" element={<Receipt />} />
          <Route path="/analytics" element={<ReliabilityCenter />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
