// Simple test to verify the language context works
import { useLanguage } from './src/context/LanguageContext';

console.log('Testing language context...');

try {
  const result = useLanguage();
  console.log('✅ useLanguage hook works:', result);
  console.log('✅ t function type:', typeof result.t);
  console.log('✅ t function test:', result.t('common.hello'));
} catch (error) {
  console.error('❌ Error testing useLanguage:', error);
}
