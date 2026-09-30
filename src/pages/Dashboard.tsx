import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, ArrowDownLeft, FileText, Smartphone, CheckCircle2, AlertCircle, XCircle, Hash } from 'lucide-react';

const Dashboard = () => {
  const [ussdOpen, setUssdOpen] = useState(false);
  const [ussdStep, setUssdStep] = useState(0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 relative">
      {/* Balance Section */}
      <div className="bg-gradient-to-r from-ecobank-900 to-ecobank-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex justify-between items-start">
           <div>
             <h2 className="text-ecobank-100 text-lg font-medium">Good morning, David</h2>
             <div className="mt-2 text-4xl font-bold">₦284,500.00</div>
           </div>
           <button onClick={() => { setUssdOpen(true); setUssdStep(0); }} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-lg text-sm font-medium">
             <Hash className="h-4 w-4" />
             *123# Simulator
           </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-8">
          <Link to="/transfer" className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <Send className="h-6 w-6" />
            <span className="text-sm">Send Money</span>
          </Link>
          <button onClick={() => alert("Request Money feature coming soon.")} className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition active:scale-95">
            <ArrowDownLeft className="h-6 w-6" />
            <span className="text-sm">Request</span>
          </button>
          <button onClick={() => alert("Pay Bills feature coming soon.")} className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition active:scale-95">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Pay Bills</span>
          </button>
          <button onClick={() => alert("Airtime feature coming soon.")} className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition active:scale-95">
            <Smartphone className="h-6 w-6" />
            <span className="text-sm">Airtime</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Network Health */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Network Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <span className="font-medium text-gray-700">GTBank</span>
              </div>
              <span className="text-success font-semibold">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <span className="font-medium text-gray-700">Access Bank</span>
              </div>
              <span className="text-success font-semibold">96%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-warning"></div>
                <span className="font-medium text-gray-700">UBA</span>
              </div>
              <span className="text-warning font-semibold">82%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-danger"></div>
                <span className="font-medium text-gray-700">Bank X</span>
              </div>
              <span className="text-danger font-semibold">64%</span>
            </div>
          </div>
          <Link to="/analytics" className="block text-center mt-6 text-sm text-ecobank-600 font-medium hover:underline">
            View full reliability report
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">School Fees</p>
                  <p className="text-xs text-gray-500">Completed • Today</p>
                </div>
              </div>
              <span className="font-semibold text-gray-900">-₦120,000</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">MTN Data</p>
                  <p className="text-xs text-gray-500">Completed • Yesterday</p>
                </div>
              </div>
              <span className="font-semibold text-gray-900">-₦5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-danger" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">GTBank Transfer</p>
                  <p className="text-xs text-danger">Reversed • 2 days ago</p>
                </div>
              </div>
              <span className="font-semibold text-gray-900">-₦25,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* USSD Modal Overlay */}
      {ussdOpen && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#e0e0e0] w-full max-w-xs rounded-[3rem] p-4 shadow-2xl relative border-8 border-gray-900">
               <div className="bg-white rounded-3xl h-[500px] overflow-hidden flex flex-col relative border border-gray-200">
                  <div className="bg-gray-100 h-6 flex items-center justify-between px-4 text-[10px] text-gray-500 border-b border-gray-200">
                     <span>9:41</span>
                     <div className="flex gap-1">
                        <span>LTE</span>
                        <span>100%</span>
                     </div>
                  </div>
                  
                  {ussdStep === 0 ? (
                     <div className="flex-1 flex flex-col p-6 items-center justify-center bg-black">
                        <div className="w-full">
                           <input type="text" readOnly value="*123#" className="w-full bg-transparent text-center text-white text-3xl font-mono outline-none mb-12" />
                           <button onClick={() => setUssdStep(1)} className="w-16 h-16 rounded-full bg-green-500 mx-auto flex items-center justify-center text-white font-bold hover:bg-green-600">
                              <Smartphone className="h-6 w-6" />
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="flex-1 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white w-full rounded-xl p-4 shadow-xl">
                           <p className="text-xs font-mono text-gray-800 whitespace-pre-wrap mb-4">
                              {ussdStep === 1 ? `SUREPAY\n\n1. Send Money\n2. Check Transfer\n3. Track Reversal\n4. Network Health` : `TRACK REVERSAL\n\nTransaction: SP-482913\nAmount: ₦25,000\n\nStatus: REVERSAL IN PROGRESS`}
                           </p>
                           <div className="flex gap-2">
                              {ussdStep === 1 && <input type="text" placeholder="3" className="border-b-2 border-ecobank-500 w-full text-center outline-none font-mono text-sm pb-1" />}
                              <button onClick={() => { if(ussdStep === 1) setUssdStep(2); else setUssdOpen(false); }} className="text-ecobank-600 font-bold text-sm ml-auto">
                                 {ussdStep === 1 ? 'SEND' : 'OK'}
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  <button onClick={() => setUssdOpen(false)} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-900 rounded-full"></button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Dashboard;
