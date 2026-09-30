import React from 'react';
import { Activity, Users, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
         <h2 className="text-2xl font-bold text-gray-900">SurePay Operations</h2>
         <p className="text-gray-500">Internal bank operations and intervention portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 col-span-2 md:col-span-1">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Txns Today</div>
          <div className="text-2xl font-bold text-gray-900">128,492</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 col-span-2 md:col-span-1">
          <div className="text-gray-500 text-sm font-medium mb-1">Successful</div>
          <div className="text-2xl font-bold text-success">124,713</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 col-span-2 md:col-span-1">
          <div className="text-gray-500 text-sm font-medium mb-1">Failed</div>
          <div className="text-2xl font-bold text-danger">2,891</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 col-span-2 md:col-span-1">
          <div className="text-gray-500 text-sm font-medium mb-1">Pending</div>
          <div className="text-2xl font-bold text-warning">888</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 col-span-2 md:col-span-1">
          <div className="text-gray-500 text-sm font-medium mb-1">Reversals</div>
          <div className="text-2xl font-bold text-gray-900">1,204</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Active Risk Interventions</h3>
               <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                        <div className="flex items-start gap-4">
                           <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                              <ShieldAlert className="h-5 w-5 text-orange-600" />
                           </div>
                           <div>
                              <h4 className="font-bold text-gray-900">Scam Pause Triggered</h4>
                              <p className="text-sm text-gray-500">Unusual large transfer to new beneficiary.</p>
                              <div className="text-xs text-gray-400 mt-1">Txn: SP-{Math.floor(800000 + Math.random()*100000)} • ₦250,000</div>
                           </div>
                        </div>
                        <button onClick={() => alert("Risk Intervention Review panel opened.")} className="px-4 py-2 text-sm font-medium text-ecobank-600 bg-ecobank-50 rounded-lg active:scale-95 transition">
                           Review
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Automated Reversals Queue</h3>
               <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                     <tr>
                        <th className="px-4 py-3 rounded-l-lg">Transaction</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Destination</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-r-lg">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-b border-gray-50">
                        <td className="px-4 py-4 font-medium">SP-948213</td>
                        <td className="px-4 py-4">₦45,000</td>
                        <td className="px-4 py-4">Bank X</td>
                        <td className="px-4 py-4"><span className="text-warning font-medium">Processing Reversal</span></td>
                        <td className="px-4 py-4"><button onClick={() => alert("Reversal details opened.")} className="text-ecobank-600 font-medium hover:underline">View</button></td>
                     </tr>
                     <tr className="border-b border-gray-50">
                        <td className="px-4 py-4 font-medium">SP-182394</td>
                        <td className="px-4 py-4">₦12,500</td>
                        <td className="px-4 py-4">UBA</td>
                        <td className="px-4 py-4"><span className="text-success font-medium">Reversed</span></td>
                        <td className="px-4 py-4"><button onClick={() => alert("Reversal details opened.")} className="text-ecobank-600 font-medium hover:underline">View</button></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-danger/10 p-6 rounded-2xl border border-danger/20">
               <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-danger" />
                  <h3 className="font-bold text-danger">Incident Detected</h3>
               </div>
               <p className="text-sm text-red-900/80 mb-4">Elevated transaction failures detected on interbank channels to Bank X.</p>
               <div className="space-y-2 text-sm text-red-900/80">
                  <div className="flex justify-between"><span>Severity:</span> <span className="font-semibold">Medium</span></div>
                  <div className="flex justify-between"><span>Detected:</span> <span className="font-semibold">10:42 AM</span></div>
                  <div className="flex justify-between"><span>Impact:</span> <span className="font-semibold">~150 txns/hr</span></div>
               </div>
               <button onClick={() => alert("Incident report opened.")} className="w-full mt-6 py-2 bg-danger text-white rounded-lg font-medium text-sm active:scale-95 transition">
                  View Incident Report
               </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h3 className="text-lg font-bold text-gray-900 mb-4">System Actions</h3>
               <div className="space-y-3">
                  <button onClick={() => alert("Manual reconciliation triggered.")} className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium active:scale-[0.98]">
                     Trigger Manual Reconciliation
                  </button>
                  <button onClick={() => alert("Routing rules updated.")} className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium active:scale-[0.98]">
                     Update Routing Rules
                  </button>
                  <button onClick={() => alert("Network warning broadcasted.")} className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium active:scale-[0.98]">
                     Broadcast Network Warning
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
