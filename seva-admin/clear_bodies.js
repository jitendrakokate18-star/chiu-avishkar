const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // We want to add an ID to the tbody of data-tables so we can target them easily
  // In patients.html, it might be <table class="data-table"> <tbody> ...
  
  content = content.replace(/<table class="data-table">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/g, (match, p1) => {
    // If it's patients.html, id="patients-tbody"
    let idName = file.replace('.html', '-tbody');
    return `<table class="data-table">\n                <tbody id="${idName}">\n                    <!-- dynamically populated -->\n                </tbody>`;
  });

  fs.writeFileSync(path.join(dir, file), content, 'utf8');
});
console.log("HTML files patched for dynamic bodies.");
