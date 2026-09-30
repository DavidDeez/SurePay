const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const layoutPath = path.join(__dirname, 'src', 'components', 'Layout.tsx');
const cssPath = path.join(__dirname, 'src', 'index.css');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [from, to] of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

const pageReplacements = [
  [/bg-white\/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900\/5 border border-white\/80/g, 'bg-white rounded-xl shadow-sm border border-gray-200'],
  [/bg-white\/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-blue-900\/5 border border-white\/80/g, 'bg-white p-6 rounded-xl shadow-sm border border-gray-200'],
  [/bg-white\/60 backdrop-blur-xl p-5 rounded-2xl shadow-2xl shadow-blue-900\/5 border border-white\/80/g, 'bg-white p-5 rounded-xl shadow-sm border border-gray-200'],
  [/bg-white\/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-blue-900\/5 border border-white\/80/g, 'bg-white rounded-xl p-6 shadow-sm border border-gray-200'],
  [/bg-white\/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900\/10 border border-white\/80/g, 'bg-white rounded-xl shadow-sm border border-gray-200'],
  [/bg-white\/80 backdrop-blur-md p-4 rounded-xl border border-white shadow-lg shadow-slate-200\/50/g, 'bg-white p-4 rounded-xl border border-gray-200 shadow-sm']
];

const files = fs.readdirSync(pagesDir);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    replaceInFile(path.join(pagesDir, file), pageReplacements);
  }
}

// Layout replacements
replaceInFile(layoutPath, [
  [/bg-white\/70 backdrop-blur-2xl border-r border-white\/50 shadow-\[4px_0_24px_rgba\(0,0,0,0\.02\)\]/g, 'bg-white border-r border-gray-200'],
  [/bg-white\/70 backdrop-blur-2xl border-b border-white\/50 shadow-\[0_4px_24px_rgba\(0,0,0,0\.02\)\]/g, 'bg-white border-b border-gray-200'],
  [/bg-transparent/g, 'bg-[#F9FAFB]']
]);

// Reset CSS background
const cssContent = `@import "tailwindcss";

@theme {
  --color-ecobank-50: #f2f8fc;
  --color-ecobank-100: #e3f0f9;
  --color-ecobank-500: #1e88e5;
  --color-ecobank-600: #1976d2;
  --color-ecobank-900: #0d47a1;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
}

@layer base {
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    @apply text-gray-900 bg-[#F9FAFB] min-h-screen antialiased;
  }
}
`;
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Cleaned up slop.');
