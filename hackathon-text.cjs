const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Update Layout.tsx
const layoutPath = path.join(srcDir, 'components', 'Layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent.replace(
  'Ecobank Innovation Concept',
  'Ecobank Hackathon Prototype'
);
fs.writeFileSync(layoutPath, layoutContent, 'utf8');

// 2. Update Login.tsx
const loginPath = path.join(srcDir, 'pages', 'Login.tsx');
let loginContent = fs.readFileSync(loginPath, 'utf8');
loginContent = loginContent.replace(
  'This is an Ecobank innovation prototype. No real credentials required.',
  'This is a hackathon prototype environment. No real banking credentials are required.'
);
fs.writeFileSync(loginPath, loginContent, 'utf8');

console.log('Hackathon context applied');
