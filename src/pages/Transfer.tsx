import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictTransferHealth, PredictionResult } from '../ml/engine';
import { AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const Transfer = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleNext = () => {
    if (step === 1) {
      if (!amount || !bank || !account) return;
      const numAmount = parseFloat(amount.replace(/,/g, ''));
      const isNewBeneficiary = true; // Simulating new beneficiary for scam pause
      const pred = predictTransferHealth(bank, numAmount, isNewBeneficiary);
      setPrediction(pred);
      
      if (pred.risk_level === 'HIGH') {
        setStep(2); // Scam Pause
      } else {
        setStep(3); // Health prediction
      }
    }
  };

  const handleConfirm = () => {
    // Generate a simulated transaction ID
    const txId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
    // Navigate to tracker, passing the state
    navigate(`/tracker/${txId}`, { state: { amount, bank, account, prediction } });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h2>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination Bank</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecobank-500 outline-none"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Select a bank</option>
              <option value="GTBank">GTBank</option>
              <option value="Access Bank">Access Bank</option>
              <option value="UBA">UBA</option>
              <option value="Bank X">Bank X</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input 
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecobank-500 outline-none"
              placeholder="e.g. 0123456789"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
            <input 
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecobank-500 outline-none text-2xl font-bold"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleNext}
            disabled={!amount || !bank || !account}
            className="w-full py-4 bg-ecobank-600 text-white rounded-xl font-semibold hover:bg-ecobank-900 transition disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            Review Transfer
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Before you send ₦{Number(amount).toLocaleString()}</h3>
          <p className="text-gray-600">This is a new beneficiary and a large amount.</p>
          
          <div className="bg-gray-50 p-6 rounded-xl text-left mt-6 space-y-4">
            <p className="font-medium text-gray-900">Take a moment to verify:</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-gray-400"/> Recipient name matches</li>
              <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-gray-400"/> Account number is correct</li>
              <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-gray-400"/> Reason for payment is valid</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-500 italic mt-4">
            "Ecobank will never ask you to transfer money to protect your account."
          </p>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => navigate('/')}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Cancel Transfer
            </button>
            <button 
              onClick={() => setStep(3)}
              className="flex-1 py-3 bg-ecobank-600 text-white rounded-xl font-semibold hover:bg-ecobank-900 transition"
            >
              I've Verified the Recipient
            </button>
          </div>
        </div>
      )}

      {step === 3 && prediction && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900">Transfer Health</h3>
            <p className="text-gray-500">Destination: {bank} • Amount: ₦{Number(amount).toLocaleString()}</p>
          </div>

          <div className={`p-6 rounded-2xl ${prediction.network_status === 'HEALTHY' ? 'bg-ecobank-50 border border-ecobank-100' : 'bg-orange-50 border border-orange-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">SUCCESS PROBABILITY</span>
              <span className={`text-3xl font-bold ${prediction.network_status === 'HEALTHY' ? 'text-ecobank-600' : 'text-orange-600'}`}>
                {Math.round(prediction.success_probability * 100)}%
              </span>
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex justify-between border-t border-gray-200/50 pt-3">
                <span className="text-gray-500">Network status</span>
                <span className="font-semibold text-gray-900">{prediction.network_status}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200/50 pt-3">
                <span className="text-gray-500">Estimated processing</span>
                <span className="font-semibold text-gray-900">{prediction.estimated_processing_seconds} seconds</span>
              </div>
              <div className="flex justify-between border-t border-gray-200/50 pt-3">
                <span className="text-gray-500">Recent failure rate</span>
                <span className="font-semibold text-gray-900">{prediction.recent_failure_rate}%</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200/50">
              <p className="text-sm font-medium text-gray-900">Recommendation:</p>
              <p className="text-gray-600 mt-1">{prediction.recommendation}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => setStep(1)}
              className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-1 py-4 bg-ecobank-600 text-white rounded-xl font-semibold hover:bg-ecobank-900 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              Continue Transfer
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-4">
            Estimates are based on simulated reliability data in this prototype.
          </p>
        </div>
      )}
    </div>
  );
};

export default Transfer;
