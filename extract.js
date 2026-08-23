const fs = require('fs');
const path = require('path');

const files = [
  'website/app/page.tsx',
  'website/app/ota-management/page.tsx',
  'website/app/revenue-growth/page.tsx',
  'website/app/digital-marketing/page.tsx',
  'website/app/services/page.tsx',
  'website/app/about/page.tsx',
  'website/components/Footer.tsx',
  'website/components/Header.tsx'
];

let output = '# CharterX Website Copy\n\nThis document contains the raw React (JSX) code for the main marketing pages of CharterX. The text copy is embedded within the component properties (like `title="xxx"`, `description="xxx"`) and HTML tags (like `<p>xxx</p>`, `<h2>xxx</h2>`). Please review and rewrite the text copy while preserving the code structure.\n\n';

for (const file of files) {
  if (fs.existsSync(file)) {
    output += `## File: ${file}\n\n\`\`\`tsx\n${fs.readFileSync(file, 'utf8')}\n\`\`\`\n\n`;
  }
}

fs.writeFileSync('/Users/mac2/.gemini/antigravity-ide/brain/8440c5d0-1014-47b8-9a3a-c9417105918b/website_copy.md', output);
console.log('Artifact created at website_copy.md');
