import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Download, Share2, ArrowLeft } from 'lucide-react';
import type { PredictionResult } from '../ml/engine';

type TransferState = {
  amount: string;
  bank: string;
  account: string;
  prediction: PredictionResult;
};

const Receipt = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TransferState | null;

  const isFailed = state?.prediction && state.prediction.success_probability < 0.8;
  const status = isFailed ? 'REVERSED' : 'SETTLED';

  return (
    <div className="max-w-md mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition mb-4">
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/10 border border-white/80 overflow-hidden relative">
        {/* Verification banner */}
        <div className={`py-3 px-6 ${isFailed ? 'bg-danger' : 'bg-success'} text-white flex items-center justify-center gap-2 font-medium`}>
          <ShieldCheck className="h-5 w-5" />
          Payment verified by SurePay
        </div>

        <div className="p-8 text-center space-y-6">
          <div>
             <h2 className="text-3xl font-bold text-gray-900">
               ₦{Number(state?.amount?.replace(/,/g, '') || 50000).toLocaleString()}
             </h2>
             <p className={`text-sm font-bold mt-1 ${isFailed ? 'text-danger' : 'text-success'}`}>
               {status}
             </p>
          </div>
          
          <div className="border-t border-b border-gray-100 py-6 space-y-4 text-left">
             <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Transaction ID</div>
                <div className="font-mono text-gray-900 font-medium">{id}</div>
             </div>
             <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Date & Time</div>
                <div className="text-gray-900 font-medium">{new Date().toLocaleString()}</div>
             </div>
             <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Recipient</div>
                <div className="text-gray-900 font-medium">{state?.bank || 'GTBank'} •••• {state?.account?.slice(-4) || '4821'}</div>
             </div>
             <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Sender</div>
                <div className="text-gray-900 font-medium">David O. (SurePay Demo)</div>
             </div>
          </div>

          {isFailed && (
             <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-left text-sm border border-orange-100">
                <span className="font-bold">Note:</span> This transaction was reversed due to destination bank failure.
             </div>
          )}

          <div className="pt-4 flex items-center justify-center gap-4">
             <button className="flex flex-col items-center gap-2 text-gray-500 hover:text-ecobank-600 transition">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Download className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Download</span>
             </button>
             <button className="flex flex-col items-center gap-2 text-gray-500 hover:text-ecobank-600 transition">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Share2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Share</span>
             </button>
          </div>
        </div>
        
        {/* Fake paper edge */}
        <div className="h-4 bg-[radial-gradient(circle_at_10px_0,transparent_10px,#fff_11px)] bg-[length:20px_20px] bg-repeat-x rotate-180 absolute bottom-0 left-0 right-0"></div>
      </div>
    </div>
  );
};

export default Receipt;
