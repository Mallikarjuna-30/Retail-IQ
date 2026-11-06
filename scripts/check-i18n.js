const fs = require('fs');
const path = require('path');

const locales = ['en', 'kn', 'hi'];
const messagesDir = path.join(__dirname, '..', 'messages');

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(getKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

console.log('🔍 Checking RetailIQ i18n translation keys across locales...\n');

const messages = {};
for (const locale of locales) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing locale file: ${filePath}`);
    process.exit(1);
  }
  try {
    messages[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse JSON for locale: ${locale}`, err);
    process.exit(1);
  }
}

const baseKeys = new Set(getKeys(messages['en']));
let hasErrors = false;

for (const locale of locales) {
  if (locale === 'en') continue;
  const currentKeys = new Set(getKeys(messages[locale]));
  
  const missingKeys = [...baseKeys].filter(k => !currentKeys.has(k));
  const extraKeys = [...currentKeys].filter(k => !baseKeys.has(k));

  if (missingKeys.length > 0) {
    console.error(`❌ Locale [${locale}] is missing ${missingKeys.length} keys:`);
    missingKeys.slice(0, 10).forEach(k => console.error(`   - ${k}`));
    if (missingKeys.length > 10) console.error(`   ... and ${missingKeys.length - 10} more.`);
    hasErrors = true;
  }

  if (extraKeys.length > 0) {
    console.warn(`⚠️  Locale [${locale}] has ${extraKeys.length} extra keys not present in 'en':`);
    extraKeys.slice(0, 5).forEach(k => console.warn(`   + ${k}`));
  }

  if (missingKeys.length === 0) {
    console.log(`✅ Locale [${locale}] contains all ${baseKeys.size} keys!`);
  }
}

if (hasErrors) {
  console.error('\n❌ i18n check failed: One or more locales are missing required translation keys.');
  process.exit(1);
} else {
  console.log(`\n🎉 Success! All ${locales.length} locales are completely synchronised with ${baseKeys.size} keys.`);
  process.exit(0);
}

