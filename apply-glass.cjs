const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

function updateClasses(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace card backgrounds
  content = content.replace(/bg-white rounded-2xl shadow-sm border border-gray-100/g, 'bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80');
  content = content.replace(/bg-white p-6 rounded-2xl shadow-sm border border-gray-100/g, 'bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80');
  content = content.replace(/bg-white p-5 rounded-2xl shadow-sm border border-gray-100/g, 'bg-white/60 backdrop-blur-xl p-5 rounded-2xl shadow-2xl shadow-blue-900/5 border border-white/80');
  content = content.replace(/bg-white rounded-2xl p-6 shadow-sm border border-gray-100/g, 'bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-blue-900/5 border border-white/80');
  content = content.replace(/bg-white rounded-2xl shadow-lg border border-gray-100/g, 'bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/10 border border-white/80');

  // Fix some internal card backgrounds (like tracker steps)
  content = content.replace(/bg-white p-4 rounded-xl border border-gray-100 shadow-sm/g, 'bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white shadow-lg shadow-slate-200/50');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

const files = fs.readdirSync(pagesDir);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    updateClasses(path.join(pagesDir, file));
  }
}
console.log('Glassmorphism applied!');
