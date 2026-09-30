const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

function replaceAll(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [from, to] of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// Dashboard
replaceAll(path.join(pagesDir, 'Dashboard.tsx'), [
  [
    `<button className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <ArrowDownLeft className="h-6 w-6" />
            <span className="text-sm">Request</span>
          </button>`,
    `<button onClick={() => alert("Request Money feature coming soon.")} className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition active:scale-95">
            <ArrowDownLeft className="h-6 w-6" />
            <span className="text-sm">Request</span>
          </button>`
  ],
  [
    `<button className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Pay Bills</span>
          </button>`,
    `<button onClick={() => alert("Pay Bills feature coming soon.")} className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition active:scale-95">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Pay Bills</span>
          </button>`
  ],
  [
    `<button className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <Smartphone className="h-6 w-6" />
            <span className="text-sm">Airtime</span>
          </button>`,
    `<button onClick={() => alert("Airtime feature coming soon.")} className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition active:scale-95">
            <Smartphone className="h-6 w-6" />
            <span className="text-sm">Airtime</span>
          </button>`
  ]
]);

// AdminDashboard
replaceAll(path.join(pagesDir, 'AdminDashboard.tsx'), [
  [
    `<button className="px-4 py-2 text-sm font-medium text-ecobank-600 bg-ecobank-50 rounded-lg">`,
    `<button onClick={() => alert("Risk Intervention Review panel opened.")} className="px-4 py-2 text-sm font-medium text-ecobank-600 bg-ecobank-50 rounded-lg active:scale-95 transition">`
  ],
  [
    `<button className="text-ecobank-600 font-medium">View</button>`,
    `<button onClick={() => alert("Reversal details opened.")} className="text-ecobank-600 font-medium hover:underline">View</button>`
  ],
  [
    `<button className="text-ecobank-600 font-medium">View</button>`,
    `<button onClick={() => alert("Reversal details opened.")} className="text-ecobank-600 font-medium hover:underline">View</button>`
  ], // There are two of these
  [
    `<button className="w-full mt-6 py-2 bg-danger text-white rounded-lg font-medium text-sm">
                  View Incident Report
               </button>`,
    `<button onClick={() => alert("Incident report opened.")} className="w-full mt-6 py-2 bg-danger text-white rounded-lg font-medium text-sm active:scale-95 transition">
                  View Incident Report
               </button>`
  ],
  [
    `<button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium">
                     Trigger Manual Reconciliation
                  </button>`,
    `<button onClick={() => alert("Manual reconciliation triggered.")} className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium active:scale-[0.98]">
                     Trigger Manual Reconciliation
                  </button>`
  ],
  [
    `<button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium">
                     Update Routing Rules
                  </button>`,
    `<button onClick={() => alert("Routing rules updated.")} className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium active:scale-[0.98]">
                     Update Routing Rules
                  </button>`
  ],
  [
    `<button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium">
                     Broadcast Network Warning
                  </button>`,
    `<button onClick={() => alert("Network warning broadcasted.")} className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium active:scale-[0.98]">
                     Broadcast Network Warning
                  </button>`
  ]
]);

// Tracker
replaceAll(path.join(pagesDir, 'Tracker.tsx'), [
  [
    `<button className="py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
              Help
            </button>`,
    `<button onClick={() => alert("Connecting to SurePay support...")} className="py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition active:scale-95">
              Help
            </button>`
  ]
]);

// Receipt
replaceAll(path.join(pagesDir, 'Receipt.tsx'), [
  [
    `<button className="flex flex-col items-center gap-2 text-gray-500 hover:text-ecobank-600 transition">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Download className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Download</span>
             </button>`,
    `<button onClick={() => alert("Downloading PDF receipt...")} className="flex flex-col items-center gap-2 text-gray-500 hover:text-ecobank-600 transition active:scale-95">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Download className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Download</span>
             </button>`
  ],
  [
    `<button className="flex flex-col items-center gap-2 text-gray-500 hover:text-ecobank-600 transition">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Share2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Share</span>
             </button>`,
    `<button onClick={() => alert("Opening share dialog...")} className="flex flex-col items-center gap-2 text-gray-500 hover:text-ecobank-600 transition active:scale-95">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Share2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Share</span>
             </button>`
  ]
]);

console.log('Made all buttons clickable with feedback');
