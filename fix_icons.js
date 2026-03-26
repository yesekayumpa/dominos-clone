const fs = require('fs');
const path = require('path');

// Ensure lucide exists
let lucidePath = path.join(__dirname, 'node_modules', 'lucide-react-native');
if (!fs.existsSync(lucidePath)) {
  console.log("lucide not found");
  process.exit(0);
}

// Find available icons
let availableIcons = new Set();
try {
  let dtsContent = fs.readFileSync(path.join(lucidePath, 'dist', 'lucide-react-native.d.ts'), 'utf8');
  const match = dtsContent.matchAll(/export declare const ([a-zA-Z0-9_]+)/g);
  for (const m of match) {
    availableIcons.add(m[1]);
  }
} catch (e) {
  // If dts fails, just hardcode a known missing list based on standard changes
  // ListOrdered -> List
  // CheckCircle2 -> CircleCheckBig
  // SlidersHorizontal -> Sliders
}

const fallbacks = {
  'ListOrdered': 'List',
  'CheckCircle2': 'CircleCheckBig',
  'SlidersHorizontal': 'Sliders',
  'ShoppingCart': 'ShoppingBag',
  'QrCode': 'ScanFace'
};

const mapIcon = (icon) => {
  if (availableIcons.size > 0 && availableIcons.has(icon)) return icon;
  if (availableIcons.size > 0 && !availableIcons.has(icon)) {
    // try to find fallback
    return fallbacks[icon] || 'Circle';
  }
  // If we couldn't parse dts, just blindly apply fallbacks
  return fallbacks[icon] || icon;
};

const files = [
  'src/navigation/MainNavigator.js',
  'src/screens/main/OrdersScreen.js',
  'src/screens/main/HomeScreen.js',
  'src/screens/main/CartScreen.js',
  'src/screens/main/ProfileScreen.js',
  'src/screens/shared/TrackOrderScreen.js',
  'src/screens/shared/AddressScreen.js',
  'src/screens/shared/ScanQRScreen.js',
  'src/screens/auth/LoginScreen.js',
  'src/screens/auth/SignUpScreen.js',
  'src/screens/auth/SetPasswordScreen.js',
  'src/screens/shared/SuccessScreen.js',
  'src/components/CustomInput.js'
];

let fixedFiles = 0;

files.forEach(f => {
  const full = path.join(__dirname, f);
  if (!fs.existsSync(full)) return;
  let code = fs.readFileSync(full, 'utf8');
  let originalCode = code;
  
  const r = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react-native['"]/g;
  let importMatch;
  let changesMade = false;
  
  // We need to carefully replace the full words in the file
  while ((importMatch = r.exec(originalCode)) !== null) {
    const rawImports = importMatch[1];
    const iconNames = rawImports.split(',').map(s => s.trim()).filter(Boolean);
    
    iconNames.forEach(icon => {
      const newIcon = mapIcon(icon);
      if (newIcon !== icon) {
        console.log(`Replacing ${icon} with ${newIcon} in ${f}`);
        // Replace in imports and in JSX
        code = code.replace(new RegExp(`\\b${icon}\\b`, 'g'), newIcon);
        changesMade = true;
      }
    });
  }
  
  if (changesMade) {
    fs.writeFileSync(full, code);
    fixedFiles++;
  }
});

console.log(`Done. Fixed ${fixedFiles} files.`);
