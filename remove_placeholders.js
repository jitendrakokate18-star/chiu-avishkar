const fs = require('fs');
const path = require('path');

function removePravatar(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('build') && !fullPath.includes('.dart_tool') && !fullPath.includes('.git')) {
                removePravatar(fullPath);
            }
        } else if (file.endsWith('.dart')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const pattern = /backgroundImage:\s*NetworkImage\('https:\/\/i\.pravatar\.cc[^']+'\),?/g;
            const replacement = 'child: const Icon(Icons.person, color: Colors.white),';
            
            if (pattern.test(content)) {
                const newContent = content.replace(pattern, replacement);
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

removePravatar(__dirname);
console.log('Done!');
