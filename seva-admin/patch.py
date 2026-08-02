import os
import re

dir_path = r'c:\Users\ABCD\Desktop\chiu avishkar\seva-admin'
html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]

# Mapping of emojis to material icons
emoji_to_icon = {
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
}

# Names replacement
names_map = {
    'Sarah Jenkins': 'Sunita Verma',
    'Michael Chen': 'Rahul Desai',
    'Emily Rodriguez': 'Anjali Patel',
    'Robert Johnson': 'Ramesh Kumar'
}

for file in html_files:
    filepath = os.path.join(dir_path, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace names
    for old, new in names_map.items():
        content = content.replace(old, new)
        
    # Replace emojis
    for emoji, icon in emoji_to_icon.items():
        content = content.replace(emoji, f'<span class="material-icons" style="font-size: 1.2rem;">{icon}</span>')
        
    # Add material icons link if not present
    if 'Material+Icons' not in content:
        content = content.replace('</head>', '  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n</head>')
        
    # Add Outfit font link if not present
    if 'Outfit:wght' not in content:
        content = content.replace('</head>', '  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n</head>')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
# Also update style.css to use Outfit
css_path = os.path.join(dir_path, 'css', 'style.css')
if os.path.exists(css_path):
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
    css = css.replace("font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;", "font-family: 'Outfit', sans-serif;")
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)

print('Done!')
