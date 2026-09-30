const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'pages', 'Dashboard.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '<div className="bg-gradient-to-r from-ecobank-900 to-ecobank-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">',
  '<div className="bg-gradient-to-r from-ecobank-900 to-ecobank-600 rounded-3xl p-5 md:p-8 text-white shadow-xl max-w-2xl mx-auto">'
);

content = content.replace(
  '<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 md:mt-8">',
  '<div className="grid grid-cols-4 gap-2 md:gap-4 mt-6">'
);

content = content.replace(
  '<span className="text-sm">Send Money</span>',
  '<span className="text-[10px] md:text-sm font-medium">Send</span>'
);

content = content.replace(
  '<span className="text-sm">Request</span>',
  '<span className="text-[10px] md:text-sm font-medium">Request</span>'
);

content = content.replace(
  '<span className="text-sm">Pay Bills</span>',
  '<span className="text-[10px] md:text-sm font-medium">Bills</span>'
);

content = content.replace(
  '<span className="text-sm">Airtime</span>',
  '<span className="text-[10px] md:text-sm font-medium">Airtime</span>'
);

// Reduce icon sizes
content = content.replace(
  /<Link to="\/transfer" className="flex flex-col items-center gap-2 bg-white\/10 rounded-xl p-3 hover:bg-white\/20 transition">/g,
  '<Link to="/transfer" className="flex flex-col items-center gap-1.5 bg-white/10 rounded-xl p-2 md:p-3 hover:bg-white/20 transition active:scale-95">'
);

content = content.replace(
  /<button onClick={\(\) => alert\("([^"]+)"\)} className="flex flex-col items-center gap-2 bg-white\/10 rounded-xl p-3 hover:bg-white\/20 transition active:scale-95">/g,
  '<button onClick={() => alert("$1")} className="flex flex-col items-center gap-1.5 bg-white/10 rounded-xl p-2 md:p-3 hover:bg-white/20 transition active:scale-95">'
);

content = content.replace(
  /<Send className="h-6 w-6" \/>/g,
  '<Send className="h-5 w-5 md:h-6 md:w-6" />'
);
content = content.replace(
  /<ArrowDownLeft className="h-6 w-6" \/>/g,
  '<ArrowDownLeft className="h-5 w-5 md:h-6 md:w-6" />'
);
content = content.replace(
  /<FileText className="h-6 w-6" \/>/g,
  '<FileText className="h-5 w-5 md:h-6 md:w-6" />'
);
content = content.replace(
  /<Smartphone className="h-6 w-6" \/>/g,
  '<Smartphone className="h-5 w-5 md:h-6 md:w-6" />'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Blue card shrunk');
