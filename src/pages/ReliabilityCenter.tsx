import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, Clock, RefreshCw, XCircle, CheckCircle2 } from 'lucide-react';

const mockDailyData = [
  { time: '06:00', success: 98, latency: 4 },
  { time: '09:00', success: 95, latency: 8 },
  { time: '12:00', success: 91, latency: 15 },
  { time: '15:00', success: 89, latency: 22 },
  { time: '18:00', success: 94, latency: 11 },
  { time: '21:00', success: 97, latency: 6 },
];

const mockBankData = [
  { name: 'Access Bank', success: 98 },
  { name: 'GTBank', success: 96 },
  { name: 'UBA', success: 92 },
  { name: 'First Bank', success: 88 },
  { name: 'Bank X', success: 74 },
];

const ReliabilityCenter = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Reliability Center</h2>
           <p className="text-gray-500">Real-time payment network intelligence</p>
        </div>
        <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-lg font-medium">
          <Activity className="h-5 w-5" />
          Network Stable
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80">
          <div className="text-gray-500 text-sm font-medium mb-1">Payment Success Rate</div>
          <div className="text-3xl font-bold text-gray-900">97.4%</div>
          <div className="text-success text-sm mt-2 flex items-center gap-1">↑ 0.2% vs yesterday</div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80">
          <div className="text-gray-500 text-sm font-medium mb-1">Avg Processing Time</div>
          <div className="text-3xl font-bold text-gray-900">11.2s</div>
          <div className="text-warning text-sm mt-2 flex items-center gap-1">↑ 1.5s vs yesterday</div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80">
          <div className="text-gray-500 text-sm font-medium mb-1">Failed Transactions</div>
          <div className="text-3xl font-bold text-gray-900">2.1%</div>
          <div className="text-success text-sm mt-2 flex items-center gap-1">↓ 0.1% vs yesterday</div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80">
          <div className="text-gray-500 text-sm font-medium mb-1">Reversal Rate</div>
          <div className="text-3xl font-bold text-gray-900">0.5%</div>
          <div className="text-gray-400 text-sm mt-2 flex items-center gap-1">— No change</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Network Success Rate (24h)</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={mockDailyData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                 <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Line type="monotone" dataKey="success" stroke="#10B981" strokeWidth={3} dot={{r: 4, fill: '#10B981', strokeWidth: 0}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Bank Reliability Comparison</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mockBankData} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                 <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontWeight: 500}} width={80} />
                 <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Bar dataKey="success" fill="#1E88E5" radius={[0, 4, 4, 0]} barSize={24}>
                   {
                     mockBankData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.success > 90 ? '#1E88E5' : entry.success > 80 ? '#F59E0B' : '#EF4444'} />
                     ))
                   }
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
      
      {/* Recent incidents */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80">
         <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Incidents</h3>
         <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-orange-100 bg-orange-50">
               <Activity className="h-6 w-6 text-orange-500 mt-0.5" />
               <div>
                  <h4 className="font-bold text-orange-900">Elevated processing delays at Bank X</h4>
                  <p className="text-sm text-orange-800 mt-1">AI detected abnormal latency patterns (avg 2m 14s). Predictions updated to re-route or warn users.</p>
                  <div className="text-xs text-orange-600 mt-2 font-medium">Ongoing • Detected 42 mins ago</div>
               </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200">
               <CheckCircle2 className="h-6 w-6 text-success mt-0.5" />
               <div>
                  <h4 className="font-bold text-gray-900">NIBSS Switch connectivity restored</h4>
                  <p className="text-sm text-gray-600 mt-1">Intermittent connection drops fully resolved. Success rates normalized to 98%.</p>
                  <div className="text-xs text-gray-500 mt-2 font-medium">Resolved • 3 hours ago</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ReliabilityCenter;
