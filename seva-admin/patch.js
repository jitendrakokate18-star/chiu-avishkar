const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const htmlFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

const emojiToIcon = {
    '📊': 'dashboard',
    '🧑‍⚕️': 'medical_services',
    '👨‍👩‍👧': 'family_restroom',
    '🧓': 'elderly',
    '📅': 'event',
    '🗓️': 'calendar_month',
    '⏱️': 'schedule',
    '💰': 'payments',
    '💳': 'credit_card',
    '📈': 'bar_chart',
    '🎧': 'headset_mic',
    '⚙️': 'settings',
    '☰': 'menu',
    '🔍': 'search',
    '🔔': 'notifications',
    '👤': 'account_circle',
    '🩺': 'stethoscope'
};

const namesMap = {
    'Sarah Jenkins': 'Sunita Verma',
    'Michael Chen': 'Rahul Desai',
    'Emily Rodriguez': 'Anjali Patel',
    'Robert Johnson': 'Ramesh Kumar'
};

htmlFiles.forEach(file => {
    const filepath = path.join(dirPath, file);
    let content = fs.readFileSync(filepath, 'utf8');

    for (const [oldName, newName] of Object.entries(namesMap)) {
        content = content.split(oldName).join(newName);
    }

    for (const [emoji, icon] of Object.entries(emojiToIcon)) {
        content = content.split(emoji).join(`<span class="material-icons" style="font-size: 1.2rem; transform: translateY(4px);">${icon}</span>`);
    }

    if (!content.includes('Material+Icons')) {
        content = content.replace('</head>', '  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n</head>');
    }

    if (!content.includes('Outfit:wght')) {
        content = content.replace('</head>', '  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n</head>');
    }

    fs.writeFileSync(filepath, content, 'utf8');
});

const cssPath = path.join(dirPath, 'css', 'style.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.split("'Segoe UI', Tahoma, Geneva, Verdana, sans-serif").join("'Outfit', sans-serif");
    css = css.split("Arial, sans-serif").join("'Outfit', sans-serif");
    fs.writeFileSync(cssPath, css, 'utf8');
}

console.log('Done');
