const lucide = require('lucide-react-native');
const icons = ['Home', 'ShoppingCart', 'ListOrdered', 'User', 'ChevronLeft', 'Search', 'ShoppingBag', 'Settings', 'Clock', 'Tag', 'MapPin', 'Heart', 'LogOut', 'ChevronRight', 'Map', 'Phone', 'Briefcase', 'Info', 'QrCode', 'Check', 'Mail', 'Lock', 'Facebook', 'Eye', 'EyeOff', 'CheckCircle2', 'SlidersHorizontal', 'Bell'];
const missing = icons.filter(icon => !lucide[icon]);
console.log('Missing icons:', missing);
