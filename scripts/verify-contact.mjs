import fs from 'node:fs';
import path from 'node:path';

const approvedNumber = '917400162509';
const approvedDomain = 'taasinteriorstyling.in';
const root = process.cwd();
const candidates = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'node_modules'].includes(entry.name)) continue;
      walk(full);
    } else {
      candidates.push(full);
    }
  }
}

const lookIn = [path.join(root, '.next'), path.join(root, 'out'), path.join(root, 'public'), path.join(root)];
for (const dir of lookIn) {
  if (fs.existsSync(dir)) walk(dir);
}

const allowedPhoneRegex = new RegExp(`917400162509|\\+91\\s*74001\\s*62509|wa\.me\\/917400162509`, 'ig');
const badPhoneRegex = /\b(?:\+?91[-\s]?\d{10}|\d{10})\b/g;
let foundBad = false;
const findings = [];

for (const file of candidates) {
  if (!/\.(html|js|mjs|json|txt|xml|css|map|svg)$/i.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');

  const phoneMatches = [...text.matchAll(/\b(?:\+?91[-\s]?\d{10}|\d{10})\b/g)];
  for (const match of phoneMatches) {
    const val = match[0].replace(/\D/g, '');
    if (val && val !== approvedNumber && val.length >= 10) {
      foundBad = true;
      findings.push(`${file}: unexpected phone ${match[0]}`);
    }
  }

  if (/(taas1\.vercel\.app|taasliving\.vercel\.app|taas-seven\.vercel\.app)/i.test(text)) {
    findings.push(`${file}: legacy hostname still present`);
  }

  if (/wa\.me\/\d+/i.test(text) && !/wa\.me\/917400162509/i.test(text)) {
    findings.push(`${file}: unexpected wa.me link`);
  }

  if (/https?:\/\/[^\s"'<>]+/i.test(text) && /\b(?:wa\.me|tel:)/i.test(text) && !/wa\.me\/917400162509/i.test(text)) {
    findings.push(`${file}: unexpected WhatsApp or tel link`);
  }
}

if (foundBad || findings.length) {
  console.error('Contact verification failed.');
  for (const item of findings) console.error(item);
  process.exit(1);
}

console.log('Contact verification passed.');
