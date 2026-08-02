const fs = require('fs');
const path = require('path');

const dir = __dirname;
const filesToUpdate = ['patients.html', 'caregivers.html', 'guardians.html', 'bookings.html'];

for (const filename of filesToUpdate) {
    const filepath = path.join(dir, filename);
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        content = content.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('dataLoaded', () => {");
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated event listener in ${filename}`);
    }
}
