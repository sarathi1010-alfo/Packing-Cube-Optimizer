const fs = require('fs');
const content = fs.readFileSync('app/layout.tsx', 'utf8');
if (!content.includes('alternates: {')) {
  console.error("Missing alternates in layout.tsx");
} else {
  console.log("alternates exists in layout.tsx");
}
