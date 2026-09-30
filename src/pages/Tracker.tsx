import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, XCircle, AlertCircle, ArrowLeft, Download, Share2, FileText } from 'lucide-react';
import type { PredictionResult } from '../ml/engine';

type TransferState = {
  amount: string;
  bank: string;
  account: string;
  prediction: PredictionResult;
};

type StepStatus = 'pending' | 'processing' | 'success' | 'failed';

const Tracker = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TransferState | null;

  const [currentStep, setCurrentStep] = useState(0);
  const [isFailed, setIsFailed] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  // If user navigates directly without state, just mock it
  const amount = state?.amount || '50,000';
  const bank = state?.bank || 'GTBank';
  const account = state?.account || '0123456789';
  const prediction = state?.prediction;

  useEffect(() => {
    // Simulate progression
    const isDestinedToFail = prediction && prediction.success_probability < 0.8;
    
    const timers: NodeJS.Timeout[] = [];
    
    // Step 1: Initiated (instant)
    setCurrentStep(1);
    
    // Step 2: Sent to network
    timers.push(setTimeout(() => {
      setCurrentStep(2);
    }, 1500));
    
    // Step 3: Destination bank
    timers.push(setTimeout(() => {
      setCurrentStep(3);
    }, 3500));
    
    // Final Step
    timers.push(setTimeout(() => {
      if (isDestinedToFail) {
        setIsFailed(true);
        setCurrentStep(4);
        
        // Simulate reversal
        timers.push(setTimeout(() => {
          setIsReversed(true);
        }, 3000));
        
      } else {
        setCurrentStep(4);
      }
    }, 6000));
    
    return () => timers.forEach(clearTimeout);
  }, [prediction]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition mb-4">
        <ArrowLeft className="h-5 w-5" />
        Back to Dashboard
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className={`p-8 text-center ${isFailed ? (isReversed ? 'bg-orange-600' : 'bg-danger') : currentStep === 4 ? 'bg-success' : 'bg-ecobank-600'} text-white transition-colors duration-500`}>
          <div className="text-sm opacity-80 mb-2">TRANSFER #{id}</div>
          <div className="text-4xl font-bold mb-2">₦{Number(amount.replace(/,/g,'')).toLocaleString()}</div>
          <div className="text-lg opacity-90">To: {bank} •••• {account.slice(-4)}</div>
          
          {isFailed && !isReversed && (
             <div className="mt-6 inline-block bg-white/20 px-4 py-2 rounded-lg font-medium text-white border border-white/30 backdrop-blur-sm">
                Money status: REVERSAL IN PROGRESS
             </div>
          )}
          {isFailed && isReversed && (
             <div className="mt-6 inline-block bg-white/20 px-4 py-2 rounded-lg font-medium text-white border border-white/30 backdrop-blur-sm">
                Money status: REVERSED TO SENDER
             </div>
          )}
        </div>
        
        <div className="p-8">
          <h3 className="font-semibold text-gray-900 mb-6">Live Timeline</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-success text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-gray-900">Transfer initiated</div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${currentStep >= 2 ? 'bg-success text-white' : 'bg-gray-200 text-gray-400'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500`}>
                {currentStep >= 2 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 shadow-sm transition-opacity duration-500 ${currentStep >= 2 ? 'bg-white opacity-100' : 'bg-gray-50 opacity-50'}`}>
                <div className="font-bold text-gray-900">Sent to payment network</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${currentStep >= 3 ? 'bg-success text-white' : 'bg-gray-200 text-gray-400'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500`}>
                {currentStep >= 3 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 shadow-sm transition-opacity duration-500 ${currentStep >= 3 ? 'bg-white opacity-100' : 'bg-gray-50 opacity-50'}`}>
                <div className="font-bold text-gray-900">Processing at destination</div>
                {currentStep === 3 && <div className="text-sm text-gray-500 mt-1">Awaiting confirmation...</div>}
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${currentStep >= 4 ? (isFailed ? 'bg-danger' : 'bg-success') : 'bg-gray-200'} text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500`}>
                {currentStep >= 4 ? (isFailed ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />) : <Clock className="w-5 h-5 text-gray-400" />}
              </div>
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 shadow-sm transition-opacity duration-500 ${currentStep >= 4 ? (isFailed ? 'bg-red-50 border-red-100 opacity-100' : 'bg-white opacity-100') : 'bg-gray-50 opacity-50'}`}>
                <div className={`font-bold ${isFailed && currentStep >= 4 ? 'text-danger' : 'text-gray-900'}`}>
                  {currentStep >= 4 ? (isFailed ? 'Transfer failed' : 'Credited') : 'Finalizing'}
                </div>
              </div>
            </div>
          </div>
          
          {isFailed && (
             <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-4">
                <AlertCircle className="h-6 w-6 text-orange-500 shrink-0" />
                <div>
                   <h4 className="font-bold text-orange-900">Your transfer could not be completed</h4>
                   <p className="text-sm text-orange-800 mt-1">
                      {isReversed ? 'The funds have been successfully returned to your account.' : 'A reversal has been initiated. You will receive your funds within the applicable resolution window.'}
                   </p>
                </div>
             </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button 
              onClick={() => navigate(`/receipt/${id}`, { state })}
              disabled={currentStep < 4}
              className="py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              <FileText className="h-5 w-5" />
              View Evidence
            </button>
            <button onClick={() => alert("Connecting to SurePay support...")} className="py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition active:scale-95">
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
