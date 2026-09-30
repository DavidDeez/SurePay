import React from 'react';
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
            This is a hackathon prototype environment. No real banking credentials are required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
