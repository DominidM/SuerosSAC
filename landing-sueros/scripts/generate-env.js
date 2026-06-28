const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const outputPath = path.join(__dirname, '..', 'src', 'environments', 'env.ts');

if (!fs.existsSync(envPath)) {
  console.error('.env file not found at', envPath);
  process.exit(1);
}

const raw = fs.readFileSync(envPath, 'utf-8');
const env = {};

raw.split('\n').forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const eq = line.indexOf('=');
  if (eq === -1) return;
  const key = line.slice(0, eq).trim();
  const val = line.slice(eq + 1).trim();
  if (key) env[key] = val;
});

const content = `// Auto-generated from .env — do not edit directly
export const env = ${JSON.stringify(env, null, 2)};
`;

fs.writeFileSync(outputPath, content, 'utf-8');
console.log('✓ Generated src/environments/env.ts from .env');
