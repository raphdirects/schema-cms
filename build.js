const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// Load content
const contentPath = path.join(__dirname, 'content', 'welcome.md');
const rawContent = fs.readFileSync(contentPath, 'utf8');
const parsed = matter(rawContent);
const htmlContent = marked(parsed.content);

// Load template
const layoutPath = path.join(__dirname, 'layouts', `${parsed.data.schema}.html`);
let template = fs.readFileSync(layoutPath, 'utf8');

// Replace placeholders
Object.entries(parsed.data).forEach(([key, value]) => {
  template = template.replaceAll(`{{ ${key} }}`, value);
});
template = template.replaceAll(`{{ content }}`, htmlContent);

// Output to /public/index.html
const outputPath = path.join(__dirname, 'public', 'index.html');
fs.writeFileSync(outputPath, template);

console.log('✅ Site built to /public/index.html');
